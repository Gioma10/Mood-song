import OpenAI from "openai";
  
const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("La chiave API OpenAI non è stata trovata. Assicurati di aver configurato il file .env correttamente.");
}

const openai = new OpenAI({ apiKey });

export const fetchOpenAIPrompt = async (emotions: string[]): Promise<{ name: string; artist: string }[]> => {
  const prompt = `Genera una lista di canzoni basate sulle seguenti emozioni: ${emotions.join(", ")}.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    if (!response.choices[0].message.content) return [];

    return response.choices[0].message.content.split("\n").map(song => {
      const [name, artist] = song.split(" - ");
      return { name: name.trim(), artist: artist?.trim() || "Sconosciuto" };
    });
  } catch (error) {
    console.error("Errore nella generazione delle canzoni:", error);
    return [];
  }
};