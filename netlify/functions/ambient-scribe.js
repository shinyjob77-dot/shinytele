const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_AUDIO_BYTES = 18 * 1024 * 1024;

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

function parseDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

function getOutputText(data) {
  return (
    data.output_text ||
    data.output
      ?.flatMap((item) => item.content || [])
      ?.map((content) => content.text || "")
      ?.join("\n")
      ?.trim() ||
    ""
  );
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return jsonResponse(500, {
      error: "OPENAI_API_KEY is not configured for the ambient scribe.",
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid request body." });
  }

  const parsedAudio = parseDataUrl(payload.audioDataUrl);
  if (!parsedAudio) {
    return jsonResponse(400, { error: "Audio recording is required." });
  }

  if (parsedAudio.buffer.length > MAX_AUDIO_BYTES) {
    return jsonResponse(413, {
      error:
        "Recording is too large for this starter scribe. Try a shorter clip, or upgrade to realtime streaming.",
    });
  }

  const visitContext = {
    visitSetting: String(payload.visitSetting || "Office visit").slice(0, 100),
    visitType: String(payload.visitType || "Primary care visit").slice(0, 120),
    patientAge: String(payload.patientAge || "not documented").slice(0, 40),
    patientSex: String(payload.patientSex || "not documented").slice(0, 60),
    chiefComplaint: String(payload.chiefComplaint || "not documented").slice(0, 300),
    typedDetails: payload.typedDetails || {},
  };

  try {
    const filename = parsedAudio.mimeType.includes("mp4")
      ? "encounter.mp4"
      : parsedAudio.mimeType.includes("wav")
        ? "encounter.wav"
        : "encounter.webm";

    const audioForm = new FormData();
    audioForm.append(
      "file",
      new Blob([parsedAudio.buffer], { type: parsedAudio.mimeType }),
      filename,
    );
    audioForm.append(
      "model",
      process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-transcribe",
    );
    audioForm.append("response_format", "json");

    const transcriptionResponse = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: audioForm,
      },
    );

    const transcriptionData = await transcriptionResponse.json();
    if (!transcriptionResponse.ok) {
      return jsonResponse(transcriptionResponse.status, {
        error: "Transcription failed.",
        detail: transcriptionData?.error?.message || "OpenAI transcription error.",
      });
    }

    const transcript = String(transcriptionData.text || "").trim();
    if (!transcript) {
      return jsonResponse(422, {
        error: "No speech was detected in the recording.",
      });
    }

    const noteResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_SCRIBE_MODEL || process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: `You are an ambient clinical scribe for a licensed clinician. Generate a progress note in the clinician's preferred format.

Critical safety rules:
- Use only the transcript, visit context, and typed details provided.
- Do not invent diagnoses, physical exam findings, vitals, lab values, imaging results, medications, doses, allergies, procedures, orders, referrals, or follow-up timing.
- Preserve every medication name, exact dose, frequency, and numeric time duration mentioned.
- If a section was not discussed, omit the section entirely.
- Do not write placeholders such as "not discussed", "not documented", "not provided", "not performed", or "unknown".
- The clinician must review and approve the note before EHR use.

Formatting rules:
- Section titles must be ALL CAPS.
- Use these sections only when supported: REASON FOR VISIT, SUBJECTIVE, OBJECTIVE, LAB STUDIES, IMAGING, ASSESSMENT, PLAN.
- REASON FOR VISIT must be 1-4 words with no punctuation.
- SUBJECTIVE begins with a one-line sentence including age, sex, relevant PMH if mentioned, and reason for visit.
- SUBJECTIVE should be concise flowing narrative. Minimize "reports/states/notes/endorses/denies". Prefer direct clinical phrasing.
- Combine negatives into compact phrases, e.g. "No injury, trauma, radiation, numbness, tingling, foot pain, lower leg discoloration, bowel or bladder incontinence."
- Do not put vitals, labs, imaging, exam findings, plan items, or patient response to interventions in SUBJECTIVE.
- If medication changes are mentioned, include changed/stopped/started medications with exact dose and duration in a second SUBJECTIVE paragraph.
- OBJECTIVE includes only measured current vitals and explicitly stated physical exam findings.
- In OBJECTIVE, use short system labels such as General, HEENT, CVS, Resp, Abd, MSK, Ext, Neuro, Psych, GU/GYN.
- General should appear first if provided. Then list abnormal findings before normal findings. Omit systems not mentioned.
- Do not start OBJECTIVE lines with hyphens.
- Translate casual exam wording into standard terminology, but do not create findings from actions alone.
- LAB STUDIES should be brief paragraph style. Group normal labs together as WNL. For abnormal labs, group by date if provided and include high/low flags only if provided.
- IMAGING format: Study: Impression/status.
- ASSESSMENT uses problem-based medical condition names only, ordered by clinical priority. Use fewer broader problems when clinically related. Do not include codes. Do not use hyphens in ASSESSMENT.
- PLAN is a separate section with hyphen bullets. Start bullets with past-tense action verbs such as Ordered, Reviewed, Continued, Started, Stopped, Increased, Decreased, Referred, Educated, Instructed.
- Do not repeat the diagnosis label in PLAN bullets.
- Group related labs/orders/medications when possible.
- Include Follow up as needed or the stated interval/testing follow-up when supported.
- Always include "Patient verbalized understanding of POC" as the final PLAN bullet.`,
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Visit context:
- Setting: ${visitContext.visitSetting}
- Type: ${visitContext.visitType}
- Patient age: ${visitContext.patientAge}
- Patient sex: ${visitContext.patientSex}
- Chief complaint: ${visitContext.chiefComplaint}

Typed pre-chart/details, if any:
- Existing transcript notes: ${String(visitContext.typedDetails.transcript || "").slice(0, 4000)}
- Vitals: ${String(visitContext.typedDetails.vitals || "").slice(0, 1500)}
- Exam: ${String(visitContext.typedDetails.exam || "").slice(0, 2500)}
- Medications/allergies: ${String(visitContext.typedDetails.medsAllergies || "").slice(0, 2500)}
- Labs/tests/imaging/screening: ${String(visitContext.typedDetails.diagnostics || "").slice(0, 2500)}
- Provider assessment: ${String(visitContext.typedDetails.assessment || "").slice(0, 2500)}
- Orders/plan/referrals/procedures: ${String(visitContext.typedDetails.ordersPlan || "").slice(0, 2500)}
- Education/precautions: ${String(visitContext.typedDetails.education || "").slice(0, 2500)}
- Follow-up: ${String(visitContext.typedDetails.followup || "").slice(0, 1500)}

Transcript:
${transcript}

Generate only the progress note. Do not include a transcript, disclaimer, billing/coding section, verification checklist, or explanation.`,
              },
            ],
          },
        ],
        max_output_tokens: 2200,
      }),
    });

    const noteData = await noteResponse.json();
    if (!noteResponse.ok) {
      return jsonResponse(noteResponse.status, {
        error: "Note generation failed.",
        detail: noteData?.error?.message || "OpenAI note generation error.",
      });
    }

    const note = getOutputText(noteData);
    return jsonResponse(200, { transcript, note });
  } catch (error) {
    return jsonResponse(500, {
      error: "Ambient scribe is temporarily unavailable.",
      detail: error?.message || "Unexpected server error.",
    });
  }
};
