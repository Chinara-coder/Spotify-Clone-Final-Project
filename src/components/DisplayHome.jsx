import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";

const DisplayHome = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/albums")
      .then(res => res.json())
      .then(data => setAlbums(data));

    fetch("http://localhost:3001/songs")
      .then(res => res.json())
      .then(data => setSongs(data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto gap-4">
          {albums.map(item => (
            <AlbumItem
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.desc}
              image={item.image}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto gap-4">
          {songs.map(item => (
            <SongItem
              key={item.id}
              id={item.id}      
              name={item.name}
              desc={item.desc}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
