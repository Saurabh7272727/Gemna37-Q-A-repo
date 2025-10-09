import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user: {}
}

const userinfoSlice = createSlice({
    name: "userinfo",
    initialState,
    reducers: {
        loadUserInformation: (state, action) => {
            state.user = {
                stats: [
                    { label: 'Points', value: 0 },
                    { label: 'Contest Ratings', value: 0 },
                    { label: 'Problems Solved', value: 0 },
                    { label: 'Solutions Submitted', value: 0 },
                ], ...action.payload
            }
        }
    }
})

export const { loadUserInformation } = userinfoSlice.actions;
export default userinfoSlice.reducer;