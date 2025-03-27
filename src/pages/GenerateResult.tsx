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
    answer: { emotions: string[], songsQuantity: string | number };
}

const GenerateResult: React.FC<Props> = ({ answer }) => {
    const [songsByEmotion, setSongsByEmotion] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedPlaylists, setSelectedPlaylists] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const storedSongs = localStorage.getItem('songsByEmotion');
        if (storedSongs) {
            setSongsByEmotion(JSON.parse(storedSongs));
            setTimeout(() => setLoading(false), 8000);
        }
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            try {
                const emotionsForSpotify = answer.emotions.map(emotion => ({
                    name: emotion,
                    artist: ""
                }));

                const token = await getSpotifyToken(emotionsForSpotify);
                if (!token) {
                    console.error("Token Spotify non ottenuto!");
                    setTimeout(() => setLoading(false), 8000);
                    return;
                }

                const emotionQuery = answer.emotions.join(", ");
                const searchQuery = `Find playlist with ${emotionQuery} titles.`;

                const offset = Math.floor(Math.random() * 1000);
                const limit = Math.min(Number(answer.songsQuantity), 20);

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

        if (songsByEmotion.length === 0) {
            fetchSongs();
        }
    }, [answer, songsByEmotion.length]);

    useEffect(() => {
        const storedPlaylists = JSON.parse(localStorage.getItem('selectedPlaylists') || '[]');
        const initialState: { [key: string]: boolean } = {};
        storedPlaylists.forEach((playlist: Playlist) => {
            initialState[playlist.id] = true;
        });
        setSelectedPlaylists(initialState);
    }, []);

    const handleSelectPlaylist = (playlist: Playlist) => {
        setSelectedPlaylists(prevState => {
            const newState = {
                ...prevState,
                [playlist.id]: !prevState[playlist.id], // Inverte lo stato di selezione
            };
    
            let storedSongs = JSON.parse(localStorage.getItem('selectedPlaylists') || '[]');
    
            if (newState[playlist.id]) {
                // Aggiungi la nuova playlist se non è già presente
                if (!storedSongs.some((p: Playlist) => p.id === playlist.id)) {
                    storedSongs.push(playlist);
                    // Manteniamo solo le ultime 10 playlist per evitare che la lista diventi troppo lunga
                    if (storedSongs.length > 10) {
                        storedSongs = storedSongs.slice(-10);
                    }
                }
            } else {
                // Se la playlist è deselezionata, rimuovila
                storedSongs = storedSongs.filter((p: Playlist) => p.id !== playlist.id);
            }
    
            localStorage.setItem('selectedPlaylists', JSON.stringify(storedSongs));
    
            return newState;
        });
    };
    

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="h-full w-full my-30">
                    <h2 className="mb-10 flex text-3xl font-bold text-center items-center justify-center">
                        Canzoni in base alle emozioni: {answer.emotions.length === 1 ? answer.emotions : answer.emotions.join(", ")}
                    </h2>
                    <div className="pl-10 pr-10">
                        <div className="space-y-8 flex justify-center items-center flex-wrap">
                            {songsByEmotion.length > 0 ? (
                                songsByEmotion.map((playlist) => (
                                    <div key={playlist.id} className="flex justify-between items-center p-4 rounded-lg shadow-md shadow-purple-600 bg-[#1b1b1b] w-full">
                                        <div className="flex justify-center items-center gap-5">
                                            <img
                                                src={playlist.images[1]?.url}
                                                alt={playlist.name}
                                                className="w-32 h-32 object-cover rounded-lg"/>
                                            <div>
                                                <h4 className="font-semibold text-lg">{playlist.name}</h4>
                                                <a
                                                    href={playlist.external_urls.spotify}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-purple-500 hover:text-purple-600 block mt-2 hover:underline"
                                                >
                                                    Apri la playlist su Spotify
                                                </a>
                                            </div>
                                        </div>
                                        <div 
                                            className="text-4xl cursor-pointer mt-2 " 
                                            onClick={() => handleSelectPlaylist(playlist)}>
                                                {selectedPlaylists[playlist.id] ? "✔️" : "+"}
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
