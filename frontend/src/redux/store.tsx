import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/productSlice'
import categoryReducer from './slice/categorySlice'
import favoriteReducer from './slice/favoritesSlice'
import appReducer from './slice/appSlice'
import authReducer from './slice/authSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        favorite: favoriteReducer,
        app: appReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch