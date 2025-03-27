import { useEffect, useState } from "react";
import Button from "../components/Button";

const Historical = () => {
  interface Playlist {
    id: string;
    name: string;
    images: { url: string }[];
  }

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
      const storedData = localStorage.getItem("selectedPlaylists");
      if (storedData) {
          try {
              const parsedPlaylists: Playlist[] = JSON.parse(storedData);
              setPlaylists(parsedPlaylists);
          } catch (error) {
              console.error("Errore nel parsing dei dati:", error);
              setPlaylists([]);
          }
      }
  }, []);

  const playlistToShow = showAll ? playlists : playlists.slice(0, 3)

  return (
    <div className="w-full h-[100%] pt-30">
      <h1 className="w-[200px] text-center m-auto text-5xl mb-10 flex flex-wrap">
        Historical
      </h1>

      <div className="w-[90%] bg-slate-300 m-auto text-black rounded-3xl mb-36">
        <h2 className="text-3xl text-center mt-10 pt-10">Ultime Canzoni</h2>
        <div className="flex justify-around items-center mt-10">
          <div className="flex w-[100%] text-center items-center">
            {playlists.length > 0 ? (
              <ul className="flex flex-wrap justify-around w-[100%]">
                {playlistToShow.map((playlist) => {
                  const imageUrl =
                    playlist.images.length > 0
                      ? playlist.images[0].url
                      : "URL_IMMAGINE_DEFAULT";
                  return (
                    <li
                      key={playlist.id}
                      className="flex flex-col w-[33.33%] items-center"
                    >
                      <p>{playlist.name}</p>
                      <img
                        src={imageUrl}
                        alt={playlist.name}
                        className="w-24 h-24 object-cover mt-2"
                      />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-center mt-5">Nessuna playlist trovata</p>
            )}
          </div>
        </div>

        <div className="p-0 mt-10 text-center">
          <Button
            text={showAll ? "Mostra meno" : "Visualizza tutto"}
            path="./"
            onClick={()=>setShowAll(!showAll)}
          />
        </div>
      </div>
    </div>
  );
};

export default Historical;
