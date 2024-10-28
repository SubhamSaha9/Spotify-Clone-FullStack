import React from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { assets } from "../../../assets/frontend-assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setPlayStatus, setTrack } from "../../../slices/playerSlice";

const DisplayAlbum = ({ audioRef }) => {
  const { songData, albumData } = useSelector((state) => state.player);

  const { id } = useParams();
  const album = albumData.filter((item) => item._id === id)[0];

  const dispatch = useDispatch();

  const playWithId = async (id) => {
    const songItem = songData.filter((song) => song._id === id)[0];
    await dispatch(setTrack(songItem));
    audioRef.current.play();
    dispatch(setPlayStatus(true));
  };
  return (
    <>
      <div className={`mt-10 flex gap-8 flex-col md:flex-row md:items-end `}>
        <img className="w-48 rounded" src={album.image} alt="img" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album.name}</h2>
          <h4>{album.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="logo"
            />
            <b className="mx-3">Spotify</b>
            &#x2022; 2,61,538 likes
            <b className="mx-3">&#x2022; {album?.songs?.length} songs</b>
            about 2hr 32 mins
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
          Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Data Added</p>
        <img src={assets.clock_icon} alt="icon" className="m-auto w-4" />
      </div>
      <hr />
      {album.songs.map((song, i) => (
        <div
          key={i}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          onClick={() => playWithId(song._id)}
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
            <img src={song.image} alt="img" className="inline w-10 mr-5" />
            {song.name}
          </p>
          <p className="text-[15px]">{album.name}</p>
          <p className="text-[15px] hidden sm:block">
            {formatDistanceToNow(new Date(song.createdAt), { addSuffix: true })}
          </p>
          <p className="text-[15px] text-center">{song.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
