import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    AttendanceInfo: {},
    SelectedSubjectRecord: {},
}

const AttendanceSlice = createSlice({
    name: "AttendanceInfo",
    initialState,
    reducers: {
        AttendanceInfoLoad: (state, action) => {
            const data = action.payload;
            state.AttendanceInfo = { ...data };
        },
        AddSelectedSubject: (state, action) => {
            const data = action.payload;
            data.forEach((item) => {
                state.SelectedSubjectRecord[`${item?._id}`] = item;
            })
        },
        deleteSubjectLocal: (state, action) => {
            const id = action.payload;
            delete state.SelectedSubjectRecord[`${id}`];
        }
    }
})

export const { AttendanceInfoLoad, AddSelectedSubject, deleteSubjectLocal } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;