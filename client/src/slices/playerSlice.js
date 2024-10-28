import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songData: localStorage.getItem("songs") ? JSON.parse(localStorage.getItem("songs")) : null,
    albumData: localStorage.getItem("albums") ? JSON.parse(localStorage.getItem("albums")) : null,
    track: {},
    playStatus: false,
    loop: false,
    time: {
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    },
    loading: false
}

const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        setSongData: (state, value) => {
            state.songData = value.payload
            state.track = value.payload[0];
        },
        setAlbumData: (state, value) => {
            state.albumData = value.payload
        },
        setTrack: (state, value) => {
            state.track = value.payload
        },
        setPlayStatus: (state, value) => {
            state.playStatus = value.payload
        },
        setLoop: (state, value) => {
            state.loop = value.payload
        },
        setTime: (state, value) => {
            state.time = value.payload
        },
        setLoading: (state, value) => {
            state.loading = value.payload
        },
    },
});

export const { setSongData, setAlbumData, setTrack, setPlayStatus, setLoop, setTime, setLoading } = playerSlice.actions;
export default playerSlice.reducer;