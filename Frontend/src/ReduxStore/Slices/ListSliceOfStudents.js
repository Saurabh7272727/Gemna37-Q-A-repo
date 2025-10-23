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
        }
    }
})

export const { addActiveUserList } = ListSliceOdfStudent.actions;
export default ListSliceOdfStudent.reducer;