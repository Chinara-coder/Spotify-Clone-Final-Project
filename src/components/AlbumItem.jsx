import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

const AlbumItem = ({ id, image, name, desc, bgColor }) => {
  const navigate = useNavigate();
  const { playWithId } = useContext(PlayerContext);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    
    // İlk mahnını tap və oxut
    fetch(`http://localhost:3001/songs?albumId=${id}`)
      .then(res => res.json())
      .then(songs => {
        if (songs.length > 0) {
          playWithId(songs[0].id);
        }
      });
  };

  return (
    <div 
      onClick={() => navigate(`/album/${id}`, { state: { bgColor } })}
      className="w-44 shrink-0 p-3 rounded cursor-pointer hover:bg-[#ffffff26] transition group"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-cover rounded"
        />

        <button
          onClick={handlePlayClick}
          className="
            absolute bottom-3 right-3
            bg-green-500 w-12 h-12
            rounded-full flex items-center justify-center
            text-black text-xl
            opacity-0 translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition duration-300
            hover:scale-105
          "
        >
          ▶
        </button>
      </div>

      <p className="font-bold mt-3 mb-1 truncate">{name}</p>
      <p className="text-slate-200 text-sm line-clamp-2">{desc}</p>
    </div>
  );
};

export default AlbumItem;