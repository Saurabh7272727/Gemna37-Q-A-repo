import { configureStore } from "@reduxjs/toolkit";
import userinfoSlice from './Slices/UserInfoSlice.js';
import accessSlice from './Slices/AuthSlice.js';

const store = configureStore({
    reducer: {
        userinfoSlice,
        accessSlice
    }
});


export default store;