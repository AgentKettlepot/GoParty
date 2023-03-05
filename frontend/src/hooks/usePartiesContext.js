import { PartiesContext } from "../context/PartiesContext";
import { useContext } from "react";

export const usePartiesContext = () => {
    const context = useContext(PartiesContext)

    if (!context){
        throw Error('UsePartiesContext must be used inside a PartiesContextProvider')
    }
    return context
}