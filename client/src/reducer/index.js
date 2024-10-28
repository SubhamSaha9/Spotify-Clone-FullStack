import { combineReducers } from "@reduxjs/toolkit";
import playerSlice from "../slices/playerSlice";

const rootReducer = combineReducers({
    player: playerSlice
});

export default rootReducer;