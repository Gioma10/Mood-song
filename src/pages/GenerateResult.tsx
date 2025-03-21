import { useEffect, useState } from "react";
// import { getSpotifyToken } from "../components/utils/spotifyService";
// import { fetchOpenAIPrompt } from "../components/utils/openAIService";

interface GenerateResultProps {
    answer: string[];
}
const GenerateResult: React.FC<GenerateResultProps> = ({ answer }) => {
    const [songs, setSongs] = useState<{ name: string; artist: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                // console.log(getSpotifyToken);
                // const promptResponse = await fetchOpenAIPrompt(answer) || [];
                // setSongs(Array.isArray(promptResponse) ? promptResponse : []);
            } catch (error) {
                console.error("Error fetching songs:", error);
                setSongs([]);
            } finally {
                setLoading(false);
            }
        };

        if (answer.length > 0) {
            fetchSongs();
        }
    }, [answer]);

    return (
        <div>
            <h2>Risultati della generazione</h2>
            {loading ? (
                <p>Caricamento in corso...</p>
            ) : (
                <ul>
                    {songs.map((song, index) => (
                        <li key={index}>{song.name} - {song.artist}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GenerateResult;
