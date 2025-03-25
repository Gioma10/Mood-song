import React, { useState, useEffect } from "react";
import { getSpotifyToken } from "../utils/spotifyService"; // Assicurati che il percorso sia corretto
import Loading from "../components/Loading";

interface Playlist {
    id: string;
    name: string;
    external_urls: { spotify: string };
    images: { url: string }[];
}

interface Props {
    answer: { emotions: string[], songsQuantity: string | number }; // Risultati dell'emozione fornita dall'utente
}

const GenerateResult: React.FC<Props> = ({ answer }) => {
    const [songsByEmotion, setSongsByEmotion] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedPlaylists, setSelectedPlaylists] = useState<{ [key: string]: boolean }>({});

    // Effetto per caricare le canzoni dal localStorage al primo caricamento della pagina
    useEffect(() => {
            const storedSongs = localStorage.getItem('songsByEmotion');
            if (storedSongs) {
                setSongsByEmotion(JSON.parse(storedSongs)); // Imposta le canzoni dallo storage
                setTimeout(() => setLoading(false), 8000); // Aggiungi un flag di caricamento falso perché sono già disponibili
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
                    setTimeout(() => setLoading(false), 8000);
                    return;
                }

                // Prompt per cercare playlist in base all'emozione dell'utente
                const emotionQuery = answer.emotions.join(", "); // Combina le emozioni in una stringa
                const searchQuery = `Find playlist with ${emotionQuery} titles.`;

                // Utilizziamo il prompt generato per cercare le playlist
                const offset = Math.floor(Math.random() * 1000);  // Varia l'offset per "saltare" brani casuali
                const limit = Math.min(Number(answer.songsQuantity), 20 ); // Limita il numero di playlist richieste a 20

                const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=playlist&limit=${limit}&offset=${offset}`;

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

                if (data.playlists && data.playlists.items) {
                    setSongsByEmotion(data.playlists.items);
                    localStorage.setItem('songsByEmotion', JSON.stringify(data.playlists.items));
                }
            } catch (error) {
                console.error("Errore nel recupero delle canzoni:", error);
            } finally {
                setTimeout(() => setLoading(false), 8000);
            }
        };

        // Se le canzoni non sono già nel localStorage, recuperale da Spotify
        if (songsByEmotion.length === 0) {
            fetchSongs();
        }
    }, [answer, songsByEmotion.length]); // La dipendenza di songsByEmotion.length assicura che non venga eseguito più di una volta

    // Funzione per cambiare lo stato della playlist
    const handleSelectPlaylist = (playlist: Playlist) => {
        setSelectedPlaylists(prevState => {
            const newState = {
            ...prevState,
            [playlist.id]: !prevState[playlist.id], // Inverte lo stato di selezione
            };

            // Se la playlist è selezionata, aggiungila al localStorage
            if(newState[playlist.id]) {
                const storedSongs = JSON.parse(localStorage.getItem('songsByEmotion') || '[]');
                const updateSongs = [...storedSongs, playlist];
                localStorage.setItem('songByEmotion', JSON.stringify(updateSongs));
            } else {
                // Se la playlist è deselezionata, rimuovila dal localStorage
                const storedSongs = JSON.parse(localStorage.getItem('songByEmotion') || '[]');
                const updateSongs = storedSongs.filter((song: Playlist) => song.id !== playlist.id);
                localStorage.setItem('songByEmotion', JSON.stringify(updateSongs));
            }

            return newState;
        });
    };

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
                                    songsByEmotion.map((playlist) => (
                                        <div key={playlist.id} className="flex p-4 rounded-lg shadow-md bg-[#1b1b1b] w-full">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg">{playlist.name}</h4>
                                                <a
                                                    href={playlist.external_urls.spotify}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-purple-500 hover:text-purple-600 block mt-2 hover:underline"
                                                >
                                                    Apri la playlist su Spotify
                                                </a>
                                                <div 
                                                className="text-4xl" 
                                                // onClick={() => handleSelectPlaylist(playlist)}
                                                >
                                                    
                                                    {selectedPlaylists[playlist.id] ? "Selezionato" : "+"}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <img
                                                    src={playlist.images[0]?.url}
                                                    alt={playlist.name}
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
