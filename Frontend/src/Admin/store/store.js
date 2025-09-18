import { initialState } from "./service";


const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD":
            return { ...state, studentList: action.payload, loading: false };
        case "UNMOUNT":
            return {};
        case "SET_LOAD":
            return {}
    }

}


export { reducer, initialState };





