import { createContext, useRef, useState, useEffect } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  // ================= REFS =================
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  // ================= STATE =================
  const [songs, setSongs] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: { minute: 0, second: 0 },
    totalTime: { minute: 0, second: 0 },
  });

  // 🔁 REPEAT
  const [isRepeat, setIsRepeat] = useState(false);

  // 🔀 SHUFFLE (SƏNDƏ VAR İDİ – SAXLANILDI)
  const [isShuffle, setIsShuffle] = useState(false);

  // ================= FETCH SONGS =================
  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then(res => res.json())
      .then(data => {
        setSongs(data);
        if (data.length > 0) {
          setTrack(data[0]);
        }
      })
      .catch(err => console.error("FETCH ERROR:", err));
  }, []);

  // ================= PLAY / PAUSE =================
  const play = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (err) {
      console.log("PLAY BLOCKED:", err);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // ================= PLAY WITH ID =================
  const playWithId = (id) => {
    const song = songs.find(s => String(s.id) === String(id));
    if (!song) return;

    setTrack(song);
    setPlayStatus(true);
    setTimeout(() => play(), 0);
  };

  // ================= PREVIOUS =================
  const previous = () => {
    if (!track || songs.length === 0) return;

    const index = songs.findIndex(s => String(s.id) === String(track.id));
    if (index > 0) {
      setTrack(songs[index - 1]);
    }
  };

  // ================= NEXT (🔀 SHUFFLE ƏLAVƏ OLUNAN YER) =================
  const next = () => {
    if (!track || songs.length === 0) return;

    if (isShuffle) {
      let randomSong;
      do {
        randomSong = songs[Math.floor(Math.random() * songs.length)];
      } while (randomSong.id === track.id);

      setTrack(randomSong);
    } else {
      const index = songs.findIndex(s => String(s.id) === String(track.id));
      if (index < songs.length - 1) {
        setTrack(songs[index + 1]);
      } else {
        setTrack(songs[0]);
      }
    }
  };

  // ================= TRACK CHANGE =================
  useEffect(() => {
    if (!audioRef.current || !track) return;

    audioRef.current.src = track.audio;
    audioRef.current.load();

    audioRef.current
      .play()
      .then(() => setPlayStatus(true))
      .catch(() => setPlayStatus(false));
  }, [track]);

  // ================= TIME + SEEK BAR =================
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => {
      if (!audio.duration) return;

      const progress = (audio.currentTime / audio.duration) * 100;
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
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [track]);

  // ================= SONG ENDED (🔀 SHUFFLE BURDA DA İŞLƏYİR) =================
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        next(); // 🔀 shuffle ON → random, OFF → normal
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [isRepeat, isShuffle, track]);

  // ================= CONTEXT VALUE =================
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
    previous,
    next,
    isRepeat,
    setIsRepeat,
    isShuffle,
    setIsShuffle,
  };

  // ================= PROVIDER =================
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
