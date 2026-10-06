import { createSlice } from "@reduxjs/toolkit"

export interface appSliceStateType {
    isDarkMode: boolean
}

export const appSliceState: appSliceStateType = {
    isDarkMode: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState: appSliceState,
    reducers: {
        changeisDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        }
    }
})

export const { changeisDarkMode } = appSlice.actions
export default appSlice.reducer