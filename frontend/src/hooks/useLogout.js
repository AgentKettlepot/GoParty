import { useAuthContext } from './useAuthContext'
import { usePartiesContext } from './usePartiesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchParties } = usePartiesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchParties({ type: 'SET_PARTIES', payload: null })
  }

  return { logout }
}