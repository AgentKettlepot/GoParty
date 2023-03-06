import { createContext, useReducer } from 'react'

export const PartiesContext = createContext()

export const partiesReducer = (state, action) => {
    switch (action.type){
        case 'SET_PARTIES':
            return {
                parties: action.payload
            }
        case 'CREATE_PARTY':
            return {
                parties: [action.payload, ...state.parties]
            }

        case 'DELETE_PARTY':
            return{
                parties: state.parties.filter((w)=> w._id !== action.payload._id)
            }
        default:
            return state
    }
}
export const PartiesContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(partiesReducer, {
        parties: null
    })

    return (
        <PartiesContext.Provider value={{...state, dispatch}}>
            { children }
        </PartiesContext.Provider>
    )
}