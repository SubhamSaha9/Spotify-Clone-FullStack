import React, { useEffect, useState } from "react";
import { assets } from "../../assets/admin-assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Addsong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("subham");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);

      const { data } = await axios.post(baseURL + "/song/add", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setAlbum("none");
        setDesc("");
        setImage(false);
        setSong(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const loadAlbums = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/album/get-all`);
      if (data.success) {
        setAlbumData(data.albums);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-e-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            hidden
            id="song"
            accept="audio/*"
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              alt="song"
              className="w-24 cursor-pointer"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            hidden
            id="image"
            accept="image/*"
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="area"
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Enter here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song description</p>
        <input
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Enter here"
          required
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          defaultValue={album}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
          {albumData.map((album, i) => (
            <option key={i} value={album.name}>
              {album.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="text-base text-white bg-black py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default Addsong;
