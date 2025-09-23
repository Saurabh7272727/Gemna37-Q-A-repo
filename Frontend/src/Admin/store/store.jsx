import { initialState } from "./service";
import { createContext } from "react";
import { useReducer } from "react";
const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD":
            return { ...state, studentList: action.payload, loading: false };
        case "RE_LOAD":
            return { loading: true, studentList: [] };
        case "LOAD_FORM_INACTIVE":
            if (state?.setSubmitBtnDisabled) {
                return { ...state, uploadingList: [...state.uploadingList], setSubmitBtnDisabled: true }
            }
            return { ...state, uploadingList: [...state.uploadingList, action.payload] };
        case "INSERT_IN_LOAD":
            state?.uploadingList.map((student) => {
                if (student.rollNumber === action.payload.rollNumber) {
                    return student.loading = false;
                } else {
                    return student;
                }
            });
            state.setSubmitBtnDisabled = false;
            return { ...state, ...state.studentList.push(action.payload) };
        case "UNSUCCESS_FULL_UPLAOD":
            const filteredData = state?.uploadingList.filter((student) => {
                if (!student?.loading) {
                    return student;
                }
            });
            return { ...state, uploadingList: [...filteredData] };
    }

}

const StoreAdminContext = createContext();
const StoreAdminContextCom = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreAdminContext.Provider value={{ dispatch, state }}>
            {children}
        </StoreAdminContext.Provider>
    )
}


export { StoreAdminContext, StoreAdminContextCom };





