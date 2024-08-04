import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
    id: string;
    username: string;
    avatar: string;
    accessToken: string;
}

export interface ProfileData {
    fullname: string;
    addr: string;
    phone: string;
}

export interface AuthState {
    user: User;
    isAuthenticated: boolean;
}
const userData: User = JSON.parse(localStorage.getItem('userData') as string)

const initialState: AuthState = userData ?
    {
        user: userData,
        isAuthenticated: true
    }
    : {
        user: {
            id: '',
            username: '',
            avatar: '',
            accessToken: ''
        },
        isAuthenticated: false
    }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true
            state.user = action.payload
            localStorage.setItem('userData', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = {
                id: '',
                username: '',
                avatar: '',
                accessToken: ''
            }
            localStorage.removeItem('userData')
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer