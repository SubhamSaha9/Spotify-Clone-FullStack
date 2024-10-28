import React, { useState } from "react";
import { assets } from "../../assets/admin-assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColor", color);

      const { data } = await axios.post(baseURL + "/album/add", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDesc("");
        setImage(false);
        setColor("#ffffff");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-e-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col items-start gap-8 text-gray-600 "
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="upload"
            className="w-24 cursor-pointer"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album name</p>
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
        <p>Album description</p>
        <input
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Enter here"
          required
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Colour</p>
        <input
          type="color"
          className="cursor-pointer"
          onChange={(e) => setColor(e.target.value)}
          value={color}
        />
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

export default AddAlbum;
