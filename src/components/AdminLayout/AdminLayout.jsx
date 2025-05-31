import React from 'react'
import AppSidebar from '../SideBar/SideBar'
import { Outlet } from 'react-router';


export function AdminLayout() {
    return (
        <AppSidebar><Outlet /></AppSidebar>
    )
}
