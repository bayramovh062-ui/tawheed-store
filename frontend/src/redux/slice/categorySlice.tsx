import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export type category = {
    id: number,
    name: string,
    icon?: String
}

export type categoryStateType = {
    categories: category[],
    loading: boolean,
    error: string | null
}

const initialState: categoryStateType = {
    categories: [],
    loading: false,
    error: null
}

export const fetchCategoriesFromBackend = createAsyncThunk('category/getCategories', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/categories')
        return response.data.categories
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'An error occuried while getting categories')
    }
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesFromBackend.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(fetchCategoriesFromBackend.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
            })
            .addCase(fetchCategoriesFromBackend.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { } = categorySlice.actions
export default categorySlice.reducer
