import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    ActiveUserList: [],
    OnlineUserList: [],
    ConnectedUserList: [
        { id: 1, name: "Aarav Mehta", status: "online" },
        { id: 2, name: "Priya Sharma", status: "offline" },
        { id: 3, name: "Rahul Verma", status: "online" },
        { id: 4, name: "Isha Patel", status: "offline" },
        { id: 5, name: "Vikram Singh", status: "online" },
    ]
}

const ListSliceOdfStudent = createSlice({
    name: "ListSliceUsers",
    initialState,
    reducers: {
        getListSliceUsers: (state, action) => {
            if (action.payload === 'ActiveUserList') {
                return state.ActiveUserList;
            } else if (action.payload === 'OnlineUserList') {
                return state.OnlineUserList;
            } else {
                return state.ConnectedUserList;
            }
        }
    }
})

export const { getListSliceUsers } = ListSliceOdfStudent.actions;
export default ListSliceOdfStudent.reducer;