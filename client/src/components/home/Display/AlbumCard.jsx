import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/album/${item._id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img src={item.image} alt="img" className="rounded w-[156px] h-[156px]" />
      <p className="font-bold mt-2 mb-1">{item.name}</p>
      <p className="text-slate-200 text-sm">{item.desc}</p>
    </div>
  );
};

export default AlbumCard;
