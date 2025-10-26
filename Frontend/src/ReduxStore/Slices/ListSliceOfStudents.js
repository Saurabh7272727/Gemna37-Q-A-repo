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
        }
    }
})

export const { addActiveUserList, addOnlineUserList, clearTheList } = ListSliceOdfStudent.actions;
export default ListSliceOdfStudent.reducer;