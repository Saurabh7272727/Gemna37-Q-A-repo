import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    login: false
}

const accessSlice = createSlice({
    name: "accessinfo",
    initialState,
    reducers: {
        accessController: (state, action) => {
            state.login = action.payload;
        }
    }
})

export const { accessController } = accessSlice.actions;
export default accessSlice.reducer;