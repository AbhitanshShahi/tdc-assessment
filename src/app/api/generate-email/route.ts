import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { customer, candidate } = await req.json();

    const prompt = `
You are a professional matchmaking consultant.

Customer:
${JSON.stringify(customer, null, 2)}

Suggested Match:
${JSON.stringify(candidate, null, 2)}

Generate JSON only:

{
  "subject": "...",
  "body": "..."
}

The email should sound professional,
warm and personalized.

No markdown.

Only JSON.
`;

    const completion = await openrouter.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json(JSON.parse(content || "{}"));
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate email",
      },
      {
        status: 500,
      },
    );
  }
}
