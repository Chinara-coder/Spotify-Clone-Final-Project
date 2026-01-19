import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();

  // 🔥 PlayerContext-dən lazım olanlar
  const { playWithId, track, playStatus } = useContext(PlayerContext);

  const [albumData, setAlbumData] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const albumId = Number(id);

    fetch("http://localhost:3001/albums")
      .then((res) => res.json())
      .then((albums) => {
        const album = albums.find((a) => Number(a.id) === albumId);
        setAlbumData(album);
      });

    fetch(`http://localhost:3001/songs?albumId=${albumId}`)
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, [id]);

  return (
    <>
      <Navbar />

      {albumData && (
        <>
          {/* ===== ALBUM HEADER ===== */}
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
            <img
              className="w-48 rounded"
              src={albumData.image}
              alt={albumData.name}
            />

            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                {albumData.name}
              </h2>
              <h4>{albumData.desc}</h4>

              <p className="mt-1">
                <img
                  className="inline-block w-5 mr-1"
                  src={assets.spotify_logo}
                  alt="spotify"
                />
                <b className="font-semibold mr-2">Spotify</b> •{" "}
                {songs.length} songs
              </p>
            </div>
          </div>

          {/* ===== TABLE HEADER ===== */}
          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p>
              <b className="mr-4">#</b>Title
            </p>
            <p>Album</p>
            <p className="hidden sm:block">Date Added</p>
            <img className="m-auto w-4" src={assets.clock_icon} alt="" />
          </div>

          <hr />

          {/* ===== SONG LIST ===== */}
          {songs.map((item, index) => {
            const isPlayingThisSong =
              playStatus &&
              track &&
              String(track.id) === String(item.id);

            return (
              <div
                key={item.id}
                onClick={() => playWithId(item.id)}
                className="
                  grid grid-cols-3 sm:grid-cols-4
                  gap-2 p-2
                  items-center
                  text-[#a7a7a7]
                  hover:bg-[#ffffff1a]
                  transition-colors duration-200
                  cursor-pointer
                "
              >
                {/* ===== NUMBER / GIF + TITLE ===== */}
                <p className="text-white flex items-center text-sm">
                  {/* 🔢 NUMBER or 🎞️ GIF */}
                  <span className="w-6 mr-4 flex justify-center">
                    {isPlayingThisSong ? (
                      <img
                        src="/images/playing.gif"
                        alt="playing"
                        className="w-4 h-4 translate-x-2"
                      />
                    ) : (
                      <b className="text-[#a7a7a7]">
                        {index + 1}
                      </b>
                    )}
                  </span>

                  <img
                    className="inline w-10 mr-5"
                    src={item.image}
                    alt={item.name}
                  />

                  {item.name}
                </p>

                <p className="text-[15px]">{albumData.name}</p>
                <p className="text-[15px] hidden sm:block">
                  5 days ago
                </p>
                <p className="text-center">{item.duration}</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default DisplayAlbum;
