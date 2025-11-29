import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    ActiveUserList: [],
    OnlineUserList: [],
    ConnectedUserList: []
}

const ListSliceOdfStudent = createSlice({
    name: "ListSliceUsers",
    initialState,
    reducers: {
        addActiveUserList: (state, action) => {
            state.ActiveUserList = [...action.payload];
        },
        addOnlineUserList: (state, action) => {
            state.OnlineUserList = [...action.payload];
        },
        clearTheList: (state, action) => {
            state.ActiveUserList = [];
            state.OnlineUserList = [];
            state.ConnectedUserList = [];
        },
        addConnectionList: (state, action) => {
            state.ConnectedUserList = [...action.payload];
        },
        setfirstMessagerSet: (state, action) => {
            const id = action.payload;
            if (!id) {
                console.error("ListSliceOfStudent me id pass karo ------------ sender kaaa");
                return;
            }

            const findConnectedUser = state.ConnectedUserList.find((user) => {
                if (user._id === id) {
                    return user
                }
            });
            if (findConnectedUser) {
                state.ConnectedUserList = state.ConnectedUserList.filter((user) => {
                    if (user._id !== findConnectedUser._id) {
                        return user;
                    }
                });
                state.ConnectedUserList.unshift(findConnectedUser);
            } else {
                const fing = state.ActiveUserList.find((user) => {
                    if (user._id === id) {
                        return user;
                    }
                });
                state.ConnectedUserList.unshift(fing);
            }
        }
    }
})

export const { addActiveUserList, addOnlineUserList, clearTheList,
    addConnectionList, setfirstMessagerSet } = ListSliceOdfStudent.actions;
export default ListSliceOdfStudent.reducer;