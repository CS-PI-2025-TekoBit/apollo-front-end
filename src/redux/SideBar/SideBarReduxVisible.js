import { createSlice } from "@reduxjs/toolkit";
const sidebarVisibleSlice = createSlice({
    name: "sidebarVisible",
    initialState: {
        isVisible: true,
    },
    reducers: {
        sideBarVisible: (state) => {
            state.isVisible = true;
        },
        sideBarNotVisible: (state) => {
            state.isVisible = false;
        },
    },
});
export const { sideBarVisible, sideBarNotVisible } = sidebarVisibleSlice.actions;
export default sidebarVisibleSlice.reducer;