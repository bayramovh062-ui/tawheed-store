import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/productSlice'
import categoryReducer from './slice/categorySlice'
import favoriteReducer from './slice/favoritesSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        favorite: favoriteReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch