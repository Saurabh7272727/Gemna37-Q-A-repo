import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    AttendanceInfo: {}
}

const AttendanceSlice = createSlice({
    name: "AttendanceInfo",
    initialState,
    reducers: {
        AttendanceInfoLoad: (state, action) => {
            const data = action.payload;
            state.AttendanceInfo = { ...data };
        }
    }
})

export const { AttendanceInfoLoad } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;