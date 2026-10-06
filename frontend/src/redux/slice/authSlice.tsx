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

export interface registerDataCredentials {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    location?: string
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

export const fetchRegisterResult = createAsyncThunk('post/register', async (registerData: registerDataCredentials, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/register`, {
            name: registerData.firstName,
            last_name: registerData.lastName,
            email: registerData.email,
            password: registerData.password
        })
        if (response.status === 201 || response.data) {
            const credentials = {
                email: registerData.email,
                password: registerData.password
            }

            const loginResult = await dispatch(fetchLoginResult(credentials)).unwrap()
            return loginResult
        }

    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'An error occuried while login')
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
            .addCase(fetchRegisterResult.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRegisterResult.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(fetchRegisterResult.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})



export const { logout } = authSlice.actions;
export default authSlice.reducer;