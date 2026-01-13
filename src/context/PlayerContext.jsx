import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {

  // 🔗 Refs
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  // 🎵 Hazırki mahnı
  const [track, setTrack] = useState(songsData[0]);

  // ▶️ Play / Pause statusu
  const [playStatus, setPlayStatus] = useState(false);

  // ⏱ Zaman məlumatları
  const [time, setTime] = useState({
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 0, second: 0 },
  });

  // ▶️ Play
  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setPlayStatus(true);
  };

  // ⏸ Pause
  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // 🎶 ID ilə mahnı çalmaq
  const playWithId = (id) => {
    setTrack(songsData[id]);

    // track dəyişəndən sonra play
    setTimeout(() => {
      if (!audioRef.current) return;
      audioRef.current.play();
      setPlayStatus(true);
    }, 0);
  };

  // ⏱ Zaman + progress bar
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => {
      if (!audio.duration) return;

      // Progress bar
      const progress =
        (audio.currentTime / audio.duration) * 100;
      if (seekBar.current) {
        seekBar.current.style.width = `${progress}%`;
      }

      // Zaman hesabı
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

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [track]);

  // 🌍 Context dəyərləri
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
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
