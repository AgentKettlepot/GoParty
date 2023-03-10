import { createContext, useReducer } from 'react'

export const RegisterContext = createContext()

export const RegisterReducer = (state, action) => {
    switch (action.type){
        case 'CREATE_USER':
            return {
                users: [action.payload, ...state.users]
            }
        default:
            return state
    }
}
export const RegisterContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(RegisterReducer, {
        users: null
    })

    return (
        <RegisterContext.Provider value={{...state, dispatch}}>
        { children }
    </RegisterContext.Provider>
    
    )
}