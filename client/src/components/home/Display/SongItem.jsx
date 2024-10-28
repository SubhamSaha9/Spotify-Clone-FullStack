import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayStatus, setTrack } from "../../../slices/playerSlice";

const SongItem = ({ song, audioRef }) => {
  const dispatch = useDispatch();

  const { songData, albumData } = useSelector((state) => state.player);

  const playWithId = async () => {
    const songItem = songData.filter((item) => item._id === song._id)[0];
    await dispatch(setTrack(songItem));

    audioRef.current.play();
    dispatch(setPlayStatus(true));
  };
  return (
    <div
      onClick={playWithId}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img src={song.image} alt="img" className="rounded w-[156px] h-[156px]" />
      <p className="font-bold mt-2 mb-1">{song.name}</p>
      <p className="text-slate-200 text-sm">{song.desc}</p>
    </div>
  );
};

export default SongItem;
