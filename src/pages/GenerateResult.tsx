import React, { useState, useEffect } from "react";
import { getSpotifyToken } from "../components/utils/spotifyService"; // Assicurati che il percorso sia corretto

interface Song {
    id: string;
    name: string;
    artists: { name: string }[];
    external_urls: { spotify: string };
    album: {
        images: { url: string }[]; // Aggiungiamo il tipo per le immagini dell'album
    };
}

interface Props {
    answer: string[]; // Risultati dell'emozione fornita dall'utente
}

const GenerateResult: React.FC<Props> = ({ answer }) => {
    const [songsByEmotion, setSongsByEmotion] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            try {
                const token = await getSpotifyToken();
                if (!token) {
                    console.error("Token Spotify non ottenuto!");
                    setLoading(false);
                    return;
                }

                // Prompt per cercare canzoni in base all'emozione dell'utente
                const emotionQuery = answer.join(", "); // Combina le emozioni in una stringa
                const searchQuery = `Cerca canzoni che esprimono le emozioni: ${emotionQuery}. Restituisci i titoli delle canzoni e gli artisti.`;

                // Utilizziamo il prompt generato per cercare le canzoni
                const offset = Math.floor(Math.random() * 100);  // Varia l'offset per "saltare" brani casuali
                const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10&offset=${offset}`;

                const response = await fetch(searchUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    console.error("Errore API Spotify:", response.status);
                    return;
                }

                const data = await response.json();

                if (data.tracks && data.tracks.items) {
                    setSongsByEmotion(data.tracks.items); // Aggiungi i risultati
                }
            } catch (error) {
                console.error("Errore nel recupero delle canzoni:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [answer]);

    return (
        <div className="h-full w-full mt-30">
            <h2 className="flex text-3xl font-bold mb-6 text-center items-center justify-center">
                Canzoni in base alle emozioni: {answer.length === 1 ? answer : answer.join(", ")}
            </h2>
            {loading ? (
                <p className="text-center text-lg">Caricamento...</p>
            ) : (
                <div className="border pl-10 pr-10">
                    <div className="space-y-8 flex justify-center items-center flex-wrap border">
                        {songsByEmotion.length > 0 ? (
                            songsByEmotion.map((song) => (
                                <div key={song.id} className="flex p-4 rounded-lg shadow-md bg-[#1b1b1b] w-full">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg">{song.name}</h4>
                                        <p className="text-sm text-gray-400">
                                            {song.artists.map((artist) => artist.name).join(", ")}
                                        </p>
                                        <a
                                            href={song.external_urls.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-500 hover:text-purple-600 block mt-2 hover:underline"
                                        >
                                            Ascolta su Spotify
                                        </a>
                                    </div>
                                    <div className="ml-4">
                                        <img
                                            src={song.album.images[0]?.url}
                                            alt={song.name}
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">Nessuna canzone trovata per queste emozioni.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateResult;
