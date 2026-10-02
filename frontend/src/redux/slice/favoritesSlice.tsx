import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import type { productType } from "./productSlice"

export interface favorite {
    id: number,
    user_id: number,
    product_id: number,
    products: productType
}

export interface favoriteStateType {
    favorites: favorite[],
    loading: boolean,
    error: string | null
}

export const favoriteState: favoriteStateType = {
    favorites: [],
    loading: false,
    error: null
}

export const fetchFavorites = createAsyncThunk('get/favorites', async (userId: number, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/favorites/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.favorites
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'An error occuried while getting favorites')

    }
})

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: favoriteState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFavorites.pending, (state) => {
            state.error = null
            state.loading = true
        })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.favorites = action.payload
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { } = favoriteSlice.actions
export default favoriteSlice.reducer