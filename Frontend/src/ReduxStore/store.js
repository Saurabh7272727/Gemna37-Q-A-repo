import { configureStore } from "@reduxjs/toolkit";
import userinfoSlice from './Slices/UserInfoSlice.js';


const store = configureStore({
    reducer: {
        userinfoSlice
    }
});


export default store;