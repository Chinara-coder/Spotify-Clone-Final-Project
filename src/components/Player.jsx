import React, { useContext } from "react";
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
    next
  } = useContext(PlayerContext);

  // Seek bar-a klik edəndə
  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    
    const seekWidth = seekBg.current.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    
    audioRef.current.currentTime = (clickX / seekWidth) * duration;
  };

  // Zamanı formatla (0:05 formatında)
  const formatTime = (time) => {
    const minutes = time.minute || 0;
    const seconds = time.second || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Guard
  if (!track) {
    return (
      <div className="h-[10%] bg-black border-t border-gray-800" />
    );
  }

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* LEFT */}
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12 rounded" src={track.image} alt={track.name} />
        <div>
          <p className="text-sm font-semibold">{track.name}</p>
          <p className="text-xs text-gray-400">{track.desc?.slice(0, 12)}</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img 
            className="w-4 cursor-pointer opacity-60 hover:opacity-100" 
            src={assets.shuffle_icon} 
            alt="shuffle" 
          />
          <img onClick={previous}
            className="w-4 cursor-pointer opacity-60 hover:opacity-100" 
            src={assets.prev_icon} 
            alt="previous" 
          />

          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer hover:scale-110 transition"
              src={assets.pause_icon}
              alt="pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer hover:scale-110 transition"
              src={assets.play_icon}
              alt="play"
            />
          )}

          <img onClick={next}
            className="w-4 cursor-pointer opacity-60 hover:opacity-100" 
            src={assets.next_icon} 
            alt="next" 
          />
          <img 
            className="w-4 cursor-pointer opacity-60 hover:opacity-100" 
            src={assets.loop_icon} 
            alt="loop" 
          />
        </div>

        <div className="flex items-center gap-5">
          <p className="text-xs text-gray-400">
            {formatTime(time.currentTime)}
          </p>

          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-lg bg-gray-600 h-1 rounded-full cursor-pointer group"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-500 rounded-full relative group-hover:bg-green-400"
            />
          </div>

          <p className="text-xs text-gray-400">
            {formatTime(time.totalTime)}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4 cursor-pointer hover:opacity-100" src={assets.plays_icon} alt="" />
        <img className="w-4 cursor-pointer hover:opacity-100" src={assets.mic_icon} alt="" />
        <img className="w-4 cursor-pointer hover:opacity-100" src={assets.queue_icon} alt="" />
        <img className="w-4 cursor-pointer hover:opacity-100" src={assets.speaker_icon} alt="" />
        <img className="w-4 cursor-pointer hover:opacity-100" src={assets.volume_icon} alt="" />
        <div className="w-20 bg-gray-600 h-1 rounded">
          <div className="w-1/2 bg-white h-1 rounded"></div>
        </div>
        <img className="w-4 cursor-pointer hover:opacity-100" src={assets.mini_player_icon} alt="" />
        <img className="w-4 cursor-pointer hover:opacity-100" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;