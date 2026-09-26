import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface productType {
    title: string,
    description?: string,
    price: Number,
    category_id: Number,
    image: string,
    is_active: boolean,
    average_rating: number,
}

export interface productStateType {
    products: productType[],
    loading: Boolean,
    error: null | string
}

const initialState: productStateType = {
    products: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk('get/prodcuts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/products')
        return response.data.products
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'An error occuried while getting products')
    }
})

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { } = productSlice.actions
export default productSlice.reducer


