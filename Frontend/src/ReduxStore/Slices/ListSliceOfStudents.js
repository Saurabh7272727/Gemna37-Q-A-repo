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
    }
})

export const { addActiveUserList, addOnlineUserList } = ListSliceOdfStudent.actions;
export default ListSliceOdfStudent.reducer;