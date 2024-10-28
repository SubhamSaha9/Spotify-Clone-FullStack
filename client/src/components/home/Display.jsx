import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Display/Navbar";
import { useSelector } from "react-redux";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const { songData, albumData } = useSelector((state) => state.player);

  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/")[2] : "";
  const albumItem = albumData?.filter((album) => album._id === albumId)[0];

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${albumItem?.bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbum]);
  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Display;
