import React, { createContext, useReducer, useEffect, useCallback } from 'react';

// Define the types
interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface AuthState {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: User | null;
}

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

// Auth context
const AuthContext = createContext<any>(null);

// Auth reducer
const authReducer = (state: AuthState, action: any) => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
                isInitialized: true,
            };
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

// Auth provider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Initialize the user on load (from localStorage or API)
    const initializeAuth = useCallback(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            dispatch({
                type: 'INITIALIZE',
                payload: { isAuthenticated: true, user },
            });
        } else {
            dispatch({
                type: 'INITIALIZE',
                payload: { isAuthenticated: false, user: null },
            });
        }
    }, []);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    // Login action
    const login = async (email: string, password: string) => {
        // Simulate login API call
        const user: User = {
            id: '1',
            name: 'John Doe',
            email,
            isAdmin: true, // Set based on your user role
        };

        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: { user } });
    };

    // Logout action
    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    // Check if user is admin
    const isAdmin = () => {
        return state.user?.isAdmin || false;
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
