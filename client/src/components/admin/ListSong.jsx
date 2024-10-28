import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const ListSong = () => {
  const [data, setData] = useState([]);

  const removeSong = async (id) => {
    const toastId = toast.loading("Deleting...");
    try {
      const { data } = await axios.post(`${baseURL}/song/delete`, { id });
      if (data.success) {
        toast.dismiss(toastId);
        toast.success(data.message);
        await fetchSongs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.message);
    }
  };

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/song/get-all`);
      if (data.success) {
        setData(data.songs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);
  return (
    <div>
      <p>All Song List</p>
      <br />
      <div className="">
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] gap-2.5 p-3 items-center border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] gap-2.5 p-3 items-center border border-gray-300 text-sm mr-5"
          >
            <img src={item.image} className="w-12" alt="img" />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>&nbsp;&nbsp;&nbsp;{item.duration}</p>
            <p
              className="cursor-pointer"
              title="delete song"
              onClick={() => removeSong(item._id)}
            >
              &nbsp;&nbsp;&nbsp; X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;
