const apiUrl = import.meta.env.VITE_OLLAMA_API_URL || "http://localhost:11434/v1/chat/completions";
const modelName = import.meta.env.VITE_OLLAMA_MODEL || "deepseek-r1";

async function generateResponse(prompt) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        stream: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || data?.error || response.statusText;
      throw new Error(`Ollama API error: ${errorMessage}`);
    }

    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    }

    if (typeof data?.output_text === "string") {
      return data.output_text;
    }

    if (typeof data?.choices?.[0]?.text === "string") {
      return data.choices[0].text;
    }

    throw new Error("Unexpected Ollama response format.");
  } catch (error) {
    console.error("Ollama API error:", error);
    return `I can't connect to Ollama right now. Check your local Ollama server at ${apiUrl} or verify the model ${modelName}.`;
  }
}

export default generateResponse;
