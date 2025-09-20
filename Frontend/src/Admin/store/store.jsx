import { initialState } from "./service";
import { createContext } from "react";
import { useReducer } from "react";
const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD":
            return { ...state, studentList: action.payload, loading: false };
        case "UNMOUNT":
            return { loading: true, studentList: [] };
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





