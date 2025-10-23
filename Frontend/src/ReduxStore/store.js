// import { configureStore } from "@reduxjs/toolkit";
// import userinfoSlice from './Slices/UserInfoSlice.js';
// import accessSlice from './Slices/AuthSlice.js';
// import ListSliceOdfStudent from './Slices/ListSliceOfStudents.js'
// const store = configureStore({
//     reducer: {
//         userinfoSlice,
//         accessSlice,
//         ListSliceOdfStudent
//     }
// });


// export default store;


import { configureStore, combineReducers } from "@reduxjs/toolkit"; // ✅ YAHAN SE
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import userinfoSlice from './Slices/UserInfoSlice.js';
import accessSlice from './Slices/AuthSlice.js';
import ListSliceOdfStudent from './Slices/ListSliceOfStudents.js';


const rootReducer = combineReducers({
    userinfoSlice,
    accessSlice,
    ListSliceOdfStudent
});


const persistConfig = {
    key: 'gemini-ai',
    storage,
    whitelist: ['accessSlice', 'userinfoSlice', 'ListSliceOdfStudent'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;