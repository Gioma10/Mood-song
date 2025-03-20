import React, { useState, useEffect } from "react";
import { getSpotifyToken } from "./utils/spotifyService"; // Assicurati che il percorso sia corretto

interface Song {
    id: string;
    name: string;
    artists: { name: string }[];
    preview_url: string | null;
    external_urls: { spotify: string };
}

interface Props {
    answer: {
        category: string;
        emotions: string[];
    };
}

const GENRE_MAP: { [key: string]: string[] } = {
    "Pop e Commerciale": ["pop", "dance-pop", "synth-pop", "k-pop"],
    "Rock e Derivati": ["classic-rock", "hard-rock", "indie-rock", "grunge"],
    "Rap e Hip-Hop": ["hip-hop", "trap", "drill", "lo-fi"],
    "Elettronica e Dance": ["edm", "house", "techno", "dubstep"],
    "Classica e Strumentale": ["classical", "instrumental"],
};

const CATEGORY_TO_GENRE: { [key: string]: string } = {
    negativity: "Rock e Derivati",
    positivity: "Pop e Commerciale",
    neutral: "Elettronica e Dance",
    variable: "Rap e Hip-Hop",
};


const GenerateResult: React.FC<Props> = ({ answer }) => {
    const [songsByGenre, setSongsByGenre] = useState<{ [key: string]: Song[] }>({});
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
                const mappedGenre = CATEGORY_TO_GENRE[answer.category] || null; // Prende il genere associato alla categoria
                const selectedGenres = mappedGenre ? GENRE_MAP[mappedGenre] : [];
                
                let genreResults: { [key: string]: Song[] } = {};

                for (const genre of selectedGenres) {
                    const searchUrl = `https://api.spotify.com/v1/search?q=genre:"${genre}"&type=track&limit=10`;

                    const response = await fetch(searchUrl, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        console.error(`Errore API Spotify (${genre}):`, response.status);
                        continue;
                    }

                    const data = await response.json();

                    if (data.tracks && data.tracks.items) {
                        genreResults[genre] = data.tracks.items;
                    }
                }

                setSongsByGenre(genreResults);
            } catch (error) {
                console.error("Errore nel recupero delle canzoni:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [answer]);

    return (
        <div className="p-6 text-white bg-black min-h-screen w-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">Risultati per: {answer.category}</h2>
            {loading ? (
                <p className="text-center text-lg">Caricamento...</p>
            ) : (
                <div className="space-y-8">
                    {Object.entries(songsByGenre).map(([genre, songs]) => (
                        <div key={genre} className="border-b pb-6">
                            <h3 className="text-2xl font-semibold mb-4">{genre.toUpperCase()}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {songs.length > 0 ? (
                                    songs.map(song => (
                                        <div key={song.id} className="border p-4 rounded-lg shadow-md bg-gray-900">
                                            <h4 className="font-semibold text-lg">{song.name}</h4>
                                            <p className="text-sm text-gray-400">
                                                {song.artists.map(artist => artist.name).join(", ")}
                                            </p>
                                            {song.preview_url ? (
                                                <audio controls className="mt-2 w-full">
                                                    <source src={song.preview_url} type="audio/mpeg" />
                                                    Il tuo browser non supporta l'elemento audio.
                                                </audio>
                                            ) : (
                                                <p className="text-sm text-gray-500">Anteprima non disponibile</p>
                                            )}
                                            <a
                                                href={song.external_urls.spotify}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 block mt-2 hover:underline">
                                                 Ascolta su Spotify
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">Nessuna canzone trovata per questo genere.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenerateResult;