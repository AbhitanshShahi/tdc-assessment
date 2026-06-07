import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { customer, candidate, score } = await req.json();

    const prompt = `
You are a professional matchmaking assistant.

Customer:
${JSON.stringify(customer, null, 2)}

Suggested Match:
${JSON.stringify(candidate, null, 2)}

Compatibility Score:
${score}

Generate JSON only:

{
  "whyItWorks": [
    "...",
    "...",
    "..."
  ],
  "concerns": [
    "...",
    "...",
    "..."
  ],
  "strengths": [
    "...",
    "...",
    "..."
  ]
}

No markdown.
No explanation.
Only valid JSON.
`;

    const completion = await openrouter.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json(JSON.parse(content || "{}"));
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate analysis",
      },
      {
        status: 500,
      },
    );
  }
}
