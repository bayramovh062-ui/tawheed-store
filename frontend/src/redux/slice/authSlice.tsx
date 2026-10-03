// enum roles {
//     USER,
//     ADMIN
// }

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export interface user {
    id: number,
    email: string,
    name: string,
    last_name: string,
    role: 'USER' | 'ADMIN',
    location: string
}

export interface loginCredentials {
    email: string,
    password: string
}

export interface loginAuthStateType {
    token: null | string,
    user: user | null,
    loading: boolean,
    error: string | null
}

export const authState: loginAuthStateType = {
    token: localStorage.getItem('token') || null,
    user: null,
    error: null,
    loading: false
}

export const fetchLoginResult = createAsyncThunk('post/login', async (credentials: loginCredentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, credentials)

        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
        }

        return response.data
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'An error occuried while login'
        )
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        logout: (state) => {
            state.token = null
            state.user = null
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginResult.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchLoginResult.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.token
                state.user = action.payload.user
            })
            .addCase(fetchLoginResult.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;