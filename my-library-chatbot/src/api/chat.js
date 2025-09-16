import faqData from "../data/faqData.json";

export async function getChatbotResponse(userMessage) {
  try { 
    // Convert JSON into string for context
    const context = faqData.map((f) => `${f.question}: ${f.answer}`).join("\n");

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        import.meta.env.VITE_GOOGLE_API_KEY, // ✅ fixed for Vite
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
You are a helpful Library Assistant. 
Always answer in **English only**.
Only use the following data to answer questions:

${context}

User: ${userMessage}
`
                }
              ]
            }
          ]
        })
      }
    );

    const result = await res.json();

    // ✅ Safe response parsing
    if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected API response:", result);
      return "😅 Sorry, I couldn’t understand.";
    }
  } catch (error) {
    console.error("Chatbot error:", error);
    return "⚠️ Server error, please try again later.";
  }
}
