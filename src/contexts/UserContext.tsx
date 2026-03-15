import { createContext, ReactNode, useState } from 'react'
import { ROLES } from '../constants/roles';

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    role: string;
}

export const DefaultUserContext = {
    loggedIn: false,
    isAdmin: false,
    role: ROLES.ORGADMIN,
    login: () => { },
    logout: () => { }
}

export const UserContext = createContext(DefaultUserContext)

export function UserProvider({ children }: { children?: ReactNode }) {

    const [loggedIn, _setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true')
    const [isAdmin] = useState(false)
    const [role] = useState(ROLES.ORGADMIN) // Default role for testing

    const setLoggedIn = (val: boolean) => {
        localStorage.setItem('loggedIn', val.toString())
        return _setLoggedIn(val)
    }

    // In a real app, these methods would communicate with a backend,
    // obtain/verify a token, etc.
    const login = () => setLoggedIn(true)
    const logout = () => setLoggedIn(false)

    return (
        <UserContext.Provider value={{ loggedIn, isAdmin, role, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}