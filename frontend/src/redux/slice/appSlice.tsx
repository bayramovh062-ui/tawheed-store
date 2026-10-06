import { createSlice } from "@reduxjs/toolkit"

export interface appSliceStateType {
    isDarkMode: boolean
    isRegisterOrLoginPage: boolean
}

export const appSliceState: appSliceStateType = {
    isDarkMode: false,
    isRegisterOrLoginPage: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState: appSliceState,
    reducers: {
        changeIsRegisterOrLoginPage: (state) => {
            state.isRegisterOrLoginPage = !state.isRegisterOrLoginPage
        },
        changeisDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        }
    }
})

export const { changeIsRegisterOrLoginPage, changeisDarkMode } = appSlice.actions
export default appSlice.reducer