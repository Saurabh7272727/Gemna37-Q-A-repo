import { configureStore } from "@reduxjs/toolkit";
import userinfoSlice from './Slices/UserInfoSlice.js';
import accessSlice from './Slices/AuthSlice.js';
import ListSliceOdfStudent from './Slices/ListSliceOfStudents.js'
const store = configureStore({
    reducer: {
        userinfoSlice,
        accessSlice,
        ListSliceOdfStudent
    }
});


export default store;