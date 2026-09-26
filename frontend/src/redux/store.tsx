import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/productSlice'
import categoryReducer from './slice/categorySlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch