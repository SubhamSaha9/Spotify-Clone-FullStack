import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/frontend-assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoop,
  setPlayStatus,
  setTime,
  setTrack,
} from "../../slices/playerSlice";

const Player = ({ audioRef }) => {
  const seekBar = useRef();
  const seekBg = useRef();
  const dispatch = useDispatch();

  const { songData, track, playStatus, loop, time } = useSelector(
    (state) => state.player
  );

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handlePlay = () => {
    audioRef.current.play();
    dispatch(setPlayStatus(true));
  };
  const handlePause = () => {
    audioRef.current.pause();
    dispatch(setPlayStatus(false));
  };
  const handlePrevious = async () => {
    if (songData.indexOf(track) > 0) {
      await dispatch(setTrack(songData[songData.indexOf(track) - 1]));
      await audioRef.current.play();
      dispatch(setPlayStatus(true));
    }
  };
  const handleNext = async () => {
    if (songData.indexOf(track) < songData.length - 1) {
      await dispatch(setTrack(songData[songData.indexOf(track) + 1]));
      await audioRef.current.play();
      dispatch(setPlayStatus(true));
    }
  };
  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    if (track) {
      setTimeout(() => {
        audioRef.current.ontimeupdate = () => {
          seekBar.current.style.width =
            Math.floor(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            ) + "%";
          dispatch(
            setTime({
              currentTime: {
                second: Math.floor(audioRef.current.currentTime % 60),
                minute: Math.floor(audioRef.current.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioRef.current.duration % 60),
                minute: Math.floor(audioRef.current.duration / 60),
              },
            })
          );
        };
      }, 1000);
    }
  }, [audioRef, track]);

  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="img" />
        <div className="">
          <p>{track?.name}</p>
          <p>{track?.desc?.slice(0, 13)}...</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt="icon"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="icon"
            onClick={handlePrevious}
            title="prev."
          />
          {playStatus ? (
            <img
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="icon"
              onClick={handlePause}
              title="pause"
            />
          ) : (
            <img
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="icon"
              onClick={handlePlay}
              title="play"
            />
          )}
          <img
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="icon"
            onClick={handleNext}
            title="next"
          />
          {loop ? (
            <img
              className="w-4 cursor-pointer font-bold"
              src={assets.unloop_icon}
              alt="icon"
              onClick={() => dispatch(setLoop(!loop))}
              title="unloop"
            />
          ) : (
            <img
              className="w-4 cursor-pointer"
              src={assets.loop_icon}
              alt="icon"
              onClick={() => dispatch(setLoop(!loop))}
              title="loop"
            />
          )}
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute < 10
              ? `0${time.currentTime.minute}`
              : time.currentTime.minute}
            :
            {time.currentTime.second < 10
              ? `0${time.currentTime.second}`
              : time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-600 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute < 10
              ? `0${time.totalTime.minute}`
              : time.totalTime.minute}
            :
            {time.totalTime.second < 10
              ? `0${time.totalTime.second}`
              : time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="icon" />
        <img className="w-4" src={assets.mic_icon} alt="icon" />
        <img className="w-4" src={assets.queue_icon} alt="icon" />
        <img className="w-4" src={assets.speaker_icon} alt="icon" />
        {isMuted ? (
          <img
            onClick={toggleMute}
            className="w-4 cursor-pointer text-white"
            src={assets.volume_mute_icon}
            alt="icon"
            title="unmute"
          />
        ) : (
          <img
            onClick={toggleMute}
            className="w-4 cursor-pointer"
            src={assets.volume_icon}
            alt="icon"
            title="mute"
          />
        )}

        <div className="w-20 bg-slate-50 h-1 rounded cursor-pointer hover:bg-green-600 transition-all duration-100"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="icon" />
        <img className="w-4" src={assets.zoom_icon} alt="icon" />
      </div>
    </div>
  ) : null;
};

export default Player;
