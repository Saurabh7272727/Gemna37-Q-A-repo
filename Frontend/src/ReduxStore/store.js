import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import userinfoSlice from './Slices/UserInfoSlice.js';
import accessSlice from './Slices/AuthSlice.js';
import ListSliceOdfStudent from './Slices/ListSliceOfStudents.js';
import AttendanceSlice from './Slices/AttendanceSlice.js';

const rootReducer = combineReducers({
    userinfoSlice,
    accessSlice,
    ListSliceOdfStudent,
    AttendanceSlice
});


const persistConfig = {
    key: 'gemini-ai',
    storage,
    whitelist: ['accessSlice', 'userinfoSlice', 'ListSliceOdfStudent', 'AttendanceSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false, // for overloading (show error)
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: process.env.NODE_ENV == 'development',
});

export const persistor = persistStore(store);
export default store;