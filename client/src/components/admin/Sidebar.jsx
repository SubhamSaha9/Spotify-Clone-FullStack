import React from "react";
import { assets } from "../../assets/admin-assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#003A10] min-h-screen pl-[4vw] sm:pl-[4.5vw]">
      <img
        src={assets.logo}
        alt="logo"
        className="mt-5 w-[max(12vw,100px)] cursor-pointer hidden sm:block"
        onClick={() => navigate("/")}
      />
      <img
        src={assets.logo_small}
        alt="logo"
        className="mt-5 w-[max(5vw,40px)] cursor-pointer mr-5 sm:hidden block"
        onClick={() => navigate("/")}
      />
      <div className="flex flex-col gap-5 mt-10">
        <NavLink
          to={"/admin/add-song"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_song} alt="add_song" className="w-5" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>

        <NavLink
          to={"/admin/list-song"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.song_icon} alt="song" className="w-5" />
          <p className="hidden sm:block">List Song</p>
        </NavLink>
        <NavLink
          to={"/admin/add-album"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_album} alt="add_album" className="w-5" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>
        <NavLink
          to={"/admin/list-album"}
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.album_icon} alt="add_song" className="w-5" />
          <p className="hidden sm:block">List Album</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
