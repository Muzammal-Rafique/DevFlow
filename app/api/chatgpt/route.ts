import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  if (!question || typeof question !== "string") {
    return NextResponse.json({ error: "Invalid question parameter" }, { status: 400 });
  }
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a knowledgeable assistant." },
          { role: "user", content: question },
        ],
      }),
    });
  
    const responseData = await response.json();
    console.log("OpenAI API Response:", responseData);
  
    if (!responseData.choices || !responseData.choices[0]?.message?.content) {
      throw new Error("Invalid response from OpenAI API");
    }
  
    const reply = responseData.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error communicating with OpenAI API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
};
