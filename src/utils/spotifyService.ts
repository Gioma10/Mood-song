const CLIENT_ID = "b14f6338cb6b46e18ea4606bf036be0a";
const CLIENT_SECRET = "9d45591edd07405bbb4f6b0609b856d3";

export const getSpotifyToken = async (promptResponse: { name: string; artist: string; }[]): Promise<string | null> => {
    const authUrl = "https://accounts.spotify.com/api/token"; // URL corretto

    try {
        console.log(promptResponse);
        const response = await fetch(authUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            },
            body: "grant_type=client_credentials",
        });

        if (!response.ok) {
            console.error("Errore nell'ottenimento del token:", response.status);
            return null;
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Errore durante la richiesta del token:", error);
        return null;
    }
};