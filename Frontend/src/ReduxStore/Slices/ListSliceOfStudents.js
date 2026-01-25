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
                try {
                    const fing = state.ActiveUserList.find((user) => {
                        if (user._id === id?.senderId) {
                            return user;
                        }
                    });

                    if (fing?.email) {
                        state.ConnectedUserList.unshift({ ...fing, chatID: id?.distination });
                    }
                    return;
                } catch (error) {
                    console.log(`Error on listslice ============== ${error}`);
                }

            }
        },

        testPurpose: (state, action) => {
            if (action?.payload?.notify === 'successfully send your message first time') {
                try {
                    const fing = state.ActiveUserList.find((user) => {
                        if (user._id === action?.payload?.receiverId) {
                            return user;
                        }
                    });
                    state.ConnectedUserList.unshift({ ...fing, chatID: action?.payload?.distination });
                    if (!fing?.email) {
                        throw Error("User not found in active user list")
                    }
                } catch (err) {
                    alert("service error - ListSliceOfStudent")
                    console.log(err.message, '===========', "ListSliceOfStudent");
                    state.ConnectedUserList = [];
                }
            }
        },
        removeDuplicateValue: (state, action) => {
            const map = new Map();
            const removeduplicate = state.ConnectedUserList.reduce((acum, user) => {
                if (!map.has(`${user.email}`)) {
                    map.set(`${user.email}`, user);
                }

                return acum = map;
            }, []);

            state.ConnectedUserList = [...removeduplicate.values()];
        },
        updateUserImage: (state, action) => {
            const findUserInConnectionList = state.ConnectedUserList.find(user => user._id === action?.payload._id);
            findUserInConnectionList.imageURL = action.payload.imageURL;

            const findUserInOnlineList = state.OnlineUserList.find(user => user._id === action?.payload._id);
            findUserInOnlineList.imageURL = action.payload.imageURL;

            const findUserInActiveUserList = state.ActiveUserList.find(user => user._id === action?.payload._id);
            findUserInActiveUserList.imageURL = action.payload.imageURL;
        }

    }
})

export const { addActiveUserList, addOnlineUserList, clearTheList,
    addConnectionList, setfirstMessagerSet, testPurpose, removeDuplicateValue, updateUserImage } = ListSliceOdfStudent.actions;
export default ListSliceOdfStudent.reducer;