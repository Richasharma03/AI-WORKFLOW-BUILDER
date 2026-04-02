import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAL_FDhAyzkfsIOtdiJ9ElDuizpTAOF_SA`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    console.log("AI RAW RESPONSE:", data);

    let output = "No response from AI";

    if (data.candidates && data.candidates.length > 0) {
      output = data.candidates[0].content.parts
        .map((p: any) => p.text)
        .join(" ");
    }

    return NextResponse.json({ output });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ output: "Error calling AI" });
  }
}