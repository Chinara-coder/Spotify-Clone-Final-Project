import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    audioRef,
    previous,
    next,
    isRepeat,
    setIsRepeat,
    isShuffle,
    setIsShuffle,
  } = useContext(PlayerContext);

  // 🔊 VOLUME (NAZİK LINE – əvvəlki kimi)
  const [volume, setVolume] = useState(0.8);

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    const width = seekBg.current.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  const formatTime = (t) => {
    const m = t.minute || 0;
    const s = t.second || 0;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!track) {
    return <div className="h-[10%] bg-black border-t border-gray-800" />;
  }

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* LEFT */}
      <div className="hidden lg:flex items-center gap-4 relative">
        <img
          className="w-12 h-12 rounded object-cover"
          src={track.image}
          alt={track.name}
        />

        {playStatus && (
          <img
            src="/images/playing.gif"
            alt="playing"
            className="absolute left-[180px] bottom-2 w-6 h-6"
          />
        )}

        <div>
          <p className="text-sm font-semibold">{track.name}</p>
          <p className="text-xs text-gray-400">
            {track.desc?.slice(0, 14)}
          </p>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4 items-center">
          {/* 🔀 SHUFFLE (YALNIZ FUNKSİON ƏLAVƏ EDİLİB) */}
          <img
            src={assets.shuffle_icon}
            onClick={() => setIsShuffle(p => !p)}
            className={`w-4 cursor-pointer ${
              isShuffle ? "opacity-100" : "opacity-60"
            }`}
          />

          <img
            onClick={previous}
            src={assets.prev_icon}
            className="w-4 cursor-pointer opacity-60 hover:opacity-100"
          />

          {playStatus ? (
            <img
              onClick={pause}
              src={assets.pause_icon}
              className="w-4 cursor-pointer hover:scale-110"
            />
          ) : (
            <img
              onClick={play}
              src={assets.play_icon}
              className="w-4 cursor-pointer hover:scale-110"
            />
          )}

          <img
            onClick={next}
            src={assets.next_icon}
            className="w-4 cursor-pointer opacity-60 hover:opacity-100"
          />

          {/* 🔁 REPEAT */}
          <img
            src={assets.loop_icon}
            onClick={() => setIsRepeat(p => !p)}
            className={`w-4 cursor-pointer ${
              isRepeat ? "opacity-100" : "opacity-60"
            }`}
          />
        </div>

        <div className="flex items-center gap-5">
          <p className="text-xs text-gray-400">
            {formatTime(time.currentTime)}
          </p>

          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-lg bg-gray-600 h-[2px] rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-[4px] w-2 bg-green-500 rounded-full"
            />
          </div>

          <p className="text-xs text-gray-400">
            {formatTime(time.totalTime)}
          </p>
        </div>
      </div>

      {/* RIGHT — BÜTÜN ICONLAR GERİ QAYIDIB */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img src={assets.plays_icon} className="w-4 cursor-pointer hover:opacity-100" />
        <img src={assets.mic_icon} className="w-4 cursor-pointer hover:opacity-100" />
        <img src={assets.queue_icon} className="w-4 cursor-pointer hover:opacity-100" />
        <img src={assets.speaker_icon} className="w-4 cursor-pointer hover:opacity-100" />

        {/* 🔊 VOLUME — NAZİK */}
        <img src={assets.volume_icon} className="w-4" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-[4px] accent-green-500 cursor-pointer"
        />

        <img src={assets.mini_player_icon} className="w-4 cursor-pointer hover:opacity-100" />
        <img src={assets.zoom_icon} className="w-4 cursor-pointer hover:opacity-100" />
      </div>
    </div>
  );
};

export default Player;
