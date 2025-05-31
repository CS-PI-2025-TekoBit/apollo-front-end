import { configureStore } from "@reduxjs/toolkit";
import sideBarCollapse from "./SideBar/SideBarCollapse";
import sidebarVisible from "./SideBar/SideBarReduxVisible";
export const store = configureStore({
    reducer: {
        sideBarCollapse: sideBarCollapse,
        sidebarVisible: sidebarVisible,
    },
})