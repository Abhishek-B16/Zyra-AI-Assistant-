const apiKey = import.meta.env.VITE_GROK_API_KEY;
const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

async function generateResponse(prompt) {
  if (!apiKey) {
    return "No Grok API key is configured. Add VITE_GROK_API_KEY to your .env file and restart the app.";
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "openai/gpt-oss-20b",
        stream: false,
        temperature: 0.7,
        max_tokens: 250,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || data?.error || response.statusText;
      throw new Error(`Grok API error: ${errorMessage}`);
    }

    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    }

    throw new Error("Unexpected Grok response format.");
  } catch (error) {
    console.error("Grok API error:", error);
    return "I can't connect to Grok right now. Check your internet connection or API key.";
  }
}

export default generateResponse;
