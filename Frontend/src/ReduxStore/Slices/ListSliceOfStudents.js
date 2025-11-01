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
        }
    }
})

export const { addActiveUserList, addOnlineUserList, clearTheList, addConnectionList } = ListSliceOdfStudent.actions;
export default ListSliceOdfStudent.reducer;