import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const removeAlbum = async (id) => {
    const toastId = toast.loading("Deleting...");
    try {
      const { data } = await axios.post(`${baseURL}/album/delete`, { id });
      if (data.success) {
        toast.dismiss(toastId);
        toast.success(data.message);
        await fetchAlbums();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.message);
    }
  };

  const fetchAlbums = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/album/get-all`);
      if (data.success) {
        setData(data.albums);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Album List</p>
      <br />
      <div className="">
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] gap-2.5 p-3 items-center border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {data.map((album, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] gap-2.5 p-3 items-center border border-gray-300 text-sm mr-5"
          >
            <img src={album.image} className="w-12" alt="img" />
            <p>{album.name}</p>
            <p>{album.desc}</p>
            <input type="color" value={album.bgColor} />
            <p
              className="cursor-pointer"
              title="delete album"
              onClick={() => removeAlbum(album._id)}
            >
              &nbsp;&nbsp;&nbsp; X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
