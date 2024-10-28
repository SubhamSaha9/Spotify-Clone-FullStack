import React from "react";
import AlbumCard from "./AlbumCard";
import SongItem from "./SongItem";
import { useSelector } from "react-redux";

const DisplayHome = ({ audioRef }) => {
  const { songData, albumData, loading } = useSelector((state) => state.player);
  return (
    <>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        {loading ? (
          <div className="flex justify-center items-center h-[160px]">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="flex overflow-auto">
            {albumData?.map((item, i) => (
              <AlbumCard item={item} key={i} />
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="flex overflow-auto">
            {songData?.map((song, i) => (
              <SongItem song={song} key={i} audioRef={audioRef} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayHome;
