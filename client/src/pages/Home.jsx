import React, { useEffect, useRef } from "react";
import Sidebar from "../components/home/Sidebar";
import { Route, Routes } from "react-router-dom";
import Display from "../components/home/Display";
import DisplayHome from "../components/home/Display/DisplayHome";
import DisplayAlbum from "../components/home/Display/DisplayAlbum";
import Player from "../components/home/Player";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlbumData,
  setLoading,
  setPlayStatus,
  setSongData,
  setTrack,
} from "../slices/playerSlice";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const { songData, track, loop } = useSelector((state) => state.player);

  const audioRef = useRef();
  const dispatch = useDispatch();

  const handleNextTrack = async () => {
    let nextTrack;
    if (loop) {
      nextTrack = songData.indexOf(track);
    } else {
      nextTrack = (songData.indexOf(track) + 1) % songData.length;
    }
    await dispatch(setTrack(songData[nextTrack]));
    await audioRef.current.play();
    dispatch(setPlayStatus(true));
  };

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/song/get-all`);
      if (data.success) {
        dispatch(setSongData(data.songs));
        localStorage.setItem("songs", JSON.stringify(data.songs));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const fetchAlbums = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/album/get-all`);
      if (data.success) {
        dispatch(setAlbumData(data.albums));
        localStorage.setItem("albums", JSON.stringify(data.albums));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      await fetchAlbums();
      await fetchSongs();
      dispatch(setLoading(false));
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Routes>
          <Route element={<Display />}>
            <Route path="/" element={<DisplayHome audioRef={audioRef} />} />
            <Route
              path="/album/:id"
              element={<DisplayAlbum audioRef={audioRef} />}
            />
          </Route>
        </Routes>
      </div>
      <Player audioRef={audioRef} />
      <audio
        ref={audioRef}
        onEnded={track && handleNextTrack}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
};

export default Home;
