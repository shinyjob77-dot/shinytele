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
        instructions: `You are a careful clinical documentation assistant for a licensed clinician.
Create a useful draft note from the transcript only. Do not invent facts, diagnoses, exam findings, orders, medications, doses, allergies, vitals, labs, or follow-up details.
If information is missing, say "not documented" or place it in "Items to verify".
Use professional clinical language while preserving uncertainty.
The clinician must review and approve everything before EHR use.
Do not provide patient-facing medical advice beyond what was clearly discussed in the transcript.`,
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

Transcript:
${transcript}

Create this format:
AMBIENT SCRIBE DRAFT - PROVIDER REVIEW REQUIRED

Items to verify before signing:
- ...

Action items:
- ...

Chief Complaint:

HPI:

ROS:

Medications / Allergies / Safety:

Objective:
- Vitals:
- Exam:
- Labs/tests/imaging/screening:

Assessment:

Plan:

Patient Instructions Discussed:

Follow-up:

Billing/Coding Support Notes:
- Do not assign final codes. Note what documentation elements support MDM/time review if present.

Transcript used:
${transcript}`,
              },
            ],
          },
        ],
        max_output_tokens: 1800,
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
