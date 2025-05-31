import { createSlice } from "@reduxjs/toolkit";

const sideBarCollapseSlice = createSlice({
    name: "sideBarCollapse",
    initialState: {
        isCollapsed: false,
    },
    reducers: {
        sideBarCollapse: (state) => {
            state.isCollapsed = true;
        },
        sideBarExpand: (state) => {
            state.isCollapsed = false;
        },
    },
});

export const { sideBarCollapse, sideBarExpand } = sideBarCollapseSlice.actions;
export default sideBarCollapseSlice.reducer;