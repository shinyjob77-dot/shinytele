const TELE_DNP_CONTEXT = `
TeleDNPnow is a telehealth practice for Arizona patients. Care is provided by Dr. Shiny Job, DNP, FNP-C, a Family Nurse Practitioner.

Services:
- Sick visits / quick care for non-emergency concerns
- Primary care follow-up
- Chronic care support
- Medication refill visits for routine non-controlled medications when clinically appropriate
- Women's health concerns
- Skin and dermatology concerns
- Lab review
- Sexual health / STI concerns
- Mental health screening and guidance only
- Medical weight loss management

Self-pay prices:
- Brief sick visit: $40
- Initial primary care telehealth visit: $60
- Follow-up visit: $40
- Weight loss initial consult: $70
- Medication refill visit: $30

Contact:
- Website: https://telednpnow.org
- Phone: (480) 626-5571
- Email: care@telednpnow.org
- Patient portal: CharmHealth/CharmTracker

Safety:
- TeleDNPnow is for non-emergency telehealth care only.
- If the user reports chest pain, severe shortness of breath, stroke symptoms, severe allergic reaction, suicidal thoughts, or life-threatening symptoms, tell them to call 911 or go to the nearest emergency room.
- Do not diagnose, prescribe, triage in detail, or provide individualized treatment plans.
- Do not ask for or collect PHI such as full name, DOB, address, medical record number, insurance ID, detailed medical history, or medication lists in this chat.
- Encourage booking a visit or using the secure patient portal for personal medical questions.
`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        answer:
          "The AI chat is not connected yet. Please add OPENAI_API_KEY in Netlify environment variables.",
      }),
    };
  }

  let question = "";
  let knowledgeContext = "";
  try {
    const body = JSON.parse(event.body || "{}");
    question = String(body.question || "").trim().slice(0, 900);
    knowledgeContext = String(body.knowledgeContext || "").trim().slice(0, 12000);
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  if (!question) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Question is required" }),
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions:
          "You are the TeleDNPnow website assistant. Answer in a warm, concise, professional way. Use only the provided TeleDNPnow context for business details. Do not diagnose, prescribe, or give individualized medical advice. For personal medical questions, recommend booking a telehealth visit or using the secure patient portal. For emergency symptoms, tell the user to call 911 or go to the nearest emergency room.",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: `${TELE_DNP_CONTEXT}\n\nWebsite knowledge library:\n${knowledgeContext}`,
              },
            ],
          },
          {
            role: "user",
            content: [{ type: "input_text", text: question }],
          },
        ],
        max_output_tokens: 220,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: corsHeaders,
        body: JSON.stringify({
          answer:
            "The AI chat could not answer right now. Please try again later or call TeleDNPnow at (480) 626-5571.",
          detail: data?.error?.message || "OpenAI request failed",
        }),
      };
    }

    const answer =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        ?.map((content) => content.text || "")
        ?.join("\n")
        ?.trim() ||
      "I could not create an answer right now. Please call TeleDNPnow at (480) 626-5571.";

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ answer }),
    };
  } catch {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        answer:
          "The AI chat is temporarily unavailable. Please call TeleDNPnow at (480) 626-5571 or use the patient portal.",
      }),
    };
  }
};
