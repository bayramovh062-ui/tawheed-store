import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {}
})

export const { } = productSlice.actions
export default productSlice.reducer


