import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";


const DisplaySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then(res => res.json())
      .then(data => setSongs(data));

    fetch("http://localhost:3001/albums")
      .then(res => res.json())
      .then(data => setAlbums(data));
  }, []);

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlbums = albums.filter(album =>
    album.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* SEARCH INPUT */}
<div className="mt-6 relative">
  {/* ICON */}
  <img
    src={assets.search_icon}
    alt="search"
    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-70"
  />

  <input
    value={query}
    onChange={(e) =>
      setSearchParams({ q: e.target.value })
    }
    placeholder="What do you want to listen to?"
    className="
      w-full
      pl-10 pr-4 py-3
      rounded-full
      bg-[#242424]
      text-white
      outline-none
      placeholder-gray-400
      focus:bg-[#2a2a2a]
      transition
    "
  />
</div>


      {/* ALBUM RESULTS */}
      {filteredAlbums.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Albums</h2>
          <div className="flex gap-4 overflow-auto">
            {filteredAlbums.map(album => (
              <AlbumItem key={album.id} {...album} />
            ))}
          </div>
        </div>
      )}

      {/* SONG RESULTS */}
      {filteredSongs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Songs</h2>
          <div className="flex gap-4 overflow-auto">
            {filteredSongs.map(song => (
              <SongItem key={song.id} {...song} />
            ))}
          </div>
        </div>
      )}

      {query && filteredSongs.length === 0 && filteredAlbums.length === 0 && (
        <p className="mt-10 text-gray-400">No results found.</p>
      )}
    </>
  );
};

export default DisplaySearch;
