import { RegisterContext } from "../context/RegisterContext";
import { useContext } from "react";

export const useRegisterContext = () => {
    const context = useContext(RegisterContext)

    if (!context){
        throw Error('UseRegisterContext must be used inside a RegisterContextProvider')
    }
    return context
}