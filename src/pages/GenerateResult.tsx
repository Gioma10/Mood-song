import React, { useState, useEffect } from "react";
import { getSpotifyToken } from "../utils/spotifyService"; // Assicurati che il percorso sia corretto
import Loading from "../components/Loading";

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
    answer: { emotions: string[], songsQuantity: string | number }; // Risultati dell'emozione fornita dall'utente
}

const GenerateResult: React.FC<Props> = ({ answer }) => {
    const [songsByEmotion, setSongsByEmotion] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    // Effetto per caricare le canzoni dal localStorage al primo caricamento della pagina
    useEffect(() => {
        const storedSongs = localStorage.getItem('songsByEmotion');
        if (storedSongs) {
            setSongsByEmotion(JSON.parse(storedSongs)); // Imposta le canzoni dallo storage
            setTimeout(()=>setLoading(false), 8000); // Aggiungi un flag di caricamento falso perché sono già disponibili
        }
    }, []);

    // Effetto per recuperare nuove canzoni da Spotify se non sono già presenti
    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            try {
                // Prepara il parametro da passare a getSpotifyToken
                const emotionsForSpotify = answer.emotions.map(emotion => ({
                    name: emotion,  // Puoi mappare l'emozione come 'name'
                    artist: "" // Puoi lasciarlo vuoto se non ti serve un artista specifico
                }));

                const token = await getSpotifyToken(emotionsForSpotify);
                if (!token) {
                    console.error("Token Spotify non ottenuto!");
                    setTimeout(()=>setLoading(false), 8000);
                    return;
                }

                // Prompt per cercare canzoni in base all'emozione dell'utente
                const emotionQuery = answer.emotions.join(", "); // Combina le emozioni in una stringa
                const searchQuery = `Find songs that express these emotions: ${emotionQuery}. Restituisci i titoli delle canzoni e gli artisti.`;

                // Utilizziamo il prompt generato per cercare le canzoni
                const offset = Math.floor(Math.random() * 1000);  // Varia l'offset per "saltare" brani casuali
                const limit = Math.min(Number(answer.songsQuantity), 100 ); // Limita il numero di canzoni richieste a 50

                const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=${limit}&offset=${offset}`;

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
                    // Salva le canzoni nel localStorage
                    localStorage.setItem('songsByEmotion', JSON.stringify(data.tracks.items));
                }
            } catch (error) {
                console.error("Errore nel recupero delle canzoni:", error);
            } finally {
                setTimeout(()=>setLoading(false), 8000);
            }
        };

        // Se le canzoni non sono già nel localStorage, recuperale da Spotify
        if (songsByEmotion.length === 0) {
            fetchSongs();
        }
    }, [answer, songsByEmotion.length]); // La dipendenza di songsByEmotion.length assicura che non venga eseguito più di una volta

    return (
        <>
            {loading ? (
                <Loading />
            ) 
            : 
            (
            <div className="h-full w-full mt-30">
                <h2 className="mt-10 flex text-3xl font-bold mb-6 text-center items-center justify-center">
                    Canzoni in base alle emozioni: {answer.emotions.length === 1 ? answer.emotions : answer.emotions.join(", ")}
                </h2>
                <div className="pl-10 pr-10">
                    <div className="space-y-8 flex justify-center items-center flex-wrap">
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
            </div>
            )}
        </>
    );
};

export default GenerateResult;
