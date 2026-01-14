import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  // Refs
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  //  API-dən gələn mahnılar
  const [songs, setSongs] = useState([]);

  //  Hazırki mahnı
  const [track, setTrack] = useState(null);

  // Play / Pause statusu
  const [playStatus, setPlayStatus] = useState(false);

  // Zaman məlumatları
  const [time, setTime] = useState({
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 0, second: 0 },
  });

  // API-dən songs fetch et
  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        if (data.length > 0) {
          setTrack(data[0]); // ilk mahnı
        }
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, []);

  // Play
  const play = () => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlayStatus(true))
      .catch(() => {});
  };

  //  Pause
  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // ID ilə mahnı seç (API-dən)
  const playWithId = (id) => {
    const song = songs.find(
      (s) => String(s.id) === String(id)
    );

    if (!song) {
      console.log("SONG TAPILMADI:", id);
      return;
    }

    setTrack(song);
  };

  const previous = () => {
  if (!track || songs.length === 0) return;

  const currentIndex = songs.findIndex(
    (s) => String(s.id) === String(track.id)
  );

  if (currentIndex > 0) {
    setTrack(songs[currentIndex - 1]);
  }
};

const next = () => {
  if (!track || songs.length === 0) return;

  const currentIndex = songs.findIndex(
    (s) => String(s.id) === String(track.id)
  );

  if (currentIndex < songs.length - 1) {
    setTrack(songs[currentIndex + 1]);
  }
};


  //  Track dəyişəndə avtomatik play
  useEffect(() => {
    if (!audioRef.current || !track) return;

    audioRef.current.src = track.audio;
    audioRef.current.load();
    audioRef.current
      .play()
      .then(() => setPlayStatus(true))
      .catch(() => setPlayStatus(false));
  }, [track]);

  //  Zaman + progress bar
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => {
      if (!audio.duration) return;

      const progress =
        (audio.currentTime / audio.duration) * 100;

      if (seekBar.current) {
        seekBar.current.style.width = `${progress}%`;
      }

      setTime({
        currentTime: {
          minute: Math.floor(audio.currentTime / 60),
          second: Math.floor(audio.currentTime % 60),
        },
        totalTime: {
          minute: Math.floor(audio.duration / 60),
          second: Math.floor(audio.duration % 60),
        },
      });
    };

    audio.addEventListener("timeupdate", updateTime);
    return () =>
      audio.removeEventListener("timeupdate", updateTime);
  }, [track]);

  //  Context dəyərləri
  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    playStatus,
    time,
    play,
    pause,
    playWithId,
    previous,next
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
