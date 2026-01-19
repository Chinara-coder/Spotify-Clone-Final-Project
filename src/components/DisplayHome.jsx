import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import DisplayInstallApp from "./DisplayInstallApp";

const DisplayHome = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  const [activeTab, setActiveTab] = useState("all");
  const [showInstallApp, setShowInstallApp] = useState(false);

  const visibleItems =
    activeTab === "all"
      ? [...songs, ...podcasts]
      : activeTab === "music"
      ? songs
      : podcasts;

  useEffect(() => {
    fetch("http://localhost:3001/albums")
      .then(res => res.json())
      .then(setAlbums);

    fetch("http://localhost:3001/songs")
      .then(res => res.json())
      .then(setSongs);

    fetch("http://localhost:3001/podcasts")
      .then(res => res.json())
      .then(setPodcasts);
  }, []);

  return (
    <>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onInstallAppClick={() => setShowInstallApp(true)}
      />

      {showInstallApp ? (
        <DisplayInstallApp />
      ) : (
        <>
          {activeTab !== "podcasts" && albums.length > 0 && (
            <div className="mb-4">
              <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
              <div className="flex overflow-auto gap-4">
                {albums.map(item => (
                  <AlbumItem key={item.id} {...item} />
                ))}
              </div>
            </div>
          )}

          {visibleItems.length > 0 && (
            <div className="mb-4">
              <h1 className="my-5 font-bold text-2xl">
                {activeTab === "podcasts"
                  ? "Podcasts"
                  : "Today's biggest hits"}
              </h1>

              <div className="flex overflow-auto gap-4">
                {visibleItems.map(item => (
                  <SongItem key={item.id} {...item} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DisplayHome;
