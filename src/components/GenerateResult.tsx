import React, { useState, useEffect } from "react";
import { getSpotifyToken } from "./utils/spotifyService"; // Assicurati che questa funzione funzioni correttamente
import axios from "axios";
import { BiCategory } from "react-icons/bi";

interface Song {
    id: string;
    name: string;
    artists: { name: string }[];
    external_urls: { spotify: string };
}

interface Props {
    answer: {
        category: string;
        emotions: string[];
    };
}

const GenerateResult: React.FC<Props> = ({ answer }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Genera il prompt per OpenAI
    const generateMusicPrompt = (category: string, emotions: string[]) => {
        console.log(emotions);
        return `Suggerisci una lista di 5-10 canzoni basate su queste emozioni: ${emotions.join(", ")}. Il mood generale è ${category}. Restituisci solo i titoli delle canzoni separati da virgola, senza numerazione o altro testo.`;
    };

    console.log('VITE_OPENAI_API_KEY:', import.meta.env.VITE_OPENAI_API_KEY);

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            try {
                const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
                console.log(import.meta.env.VITE_OPENAI_API_KEY);

                // 1️⃣ Chiamata API a OpenAI per ottenere titoli delle canzoni
                const openAiResponse = await axios.post(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        model: "gpt-4",
                        messages: [
                            { role: "system", content: "Sei un AI esperto in musica." },
                            { role: "user", content: generateMusicPrompt(answer.category, answer.emotions) },
                        ],
                        max_tokens: 100,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const aiGeneratedContent: string = openAiResponse.data.choices[0]?.message?.content || "";
                const aiGeneratedSongs: string[] = aiGeneratedContent
                    .split(",") // Dividiamo per virgola invece che per "\n"
                    .map(song => song.trim())
                    .filter(song => song !== "");

                console.log("Titoli generati:", aiGeneratedSongs);

                if (aiGeneratedSongs.length === 0) {
                    setSongs([]);
                    return;
                }

                // 2️⃣ Otteniamo il token Spotify
                const spotifyToken = await getSpotifyToken();
                if (!spotifyToken) {
                    console.error("Errore nel recupero del token Spotify.");
                    setSongs([]);
                    return;
                }

                // 3️⃣ Cerchiamo ogni canzone su Spotify
                const fetchedSongs: Song[] = [];

                for (const songTitle of aiGeneratedSongs) {
                    const searchResponse = await axios.get(
                        `https://api.spotify.com/v1/search`,
                        {
                            params: {
                                q: songTitle,
                                type: "track",
                                limit: 1,
                            },
                            headers: {
                                Authorization: `Bearer ${spotifyToken}`,
                            },
                        }
                    );

                    const tracks = searchResponse.data.tracks.items;
                    if (tracks.length > 0) {
                        fetchedSongs.push(tracks[0]); // Aggiungiamo il primo risultato valido
                    }
                }

                setSongs(fetchedSongs);
            } catch (error) {
                console.error("Errore nel recupero delle canzoni:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [answer]);

    return (
        <div className="p-6 text-white bg-black min-h-screen w-screen mt-7">
            <h2 className="text-3xl font-bold mb-6 text-center">
                Risultati per: {answer.category}
            </h2>
            {loading ? (
                <p className="text-center text-lg">Caricamento...</p>
            ) : (
                <div className="space-y-8">
                    {songs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {songs.map((song) => (
                                <div key={song.id} className="border p-4 rounded-lg shadow-md bg-gray-900">
                                    <h4 className="font-semibold text-lg">{song.name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {song.artists.map((artist) => artist.name).join(", ")}
                                    </p>
                                    <a
                                        href={song.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 block mt-2 hover:underline"
                                    >
                                        🎵 Ascolta su Spotify
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center">Nessuna canzone trovata.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GenerateResult;
