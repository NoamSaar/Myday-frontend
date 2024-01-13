import { Outlet } from "react-router";
import { useSelector } from "react-redux";

import { AppHeader } from "../cmps/AppHeader";
import { Sidebar } from "../cmps/Sidebar/Sidebar";
import { DynamicModal } from "../cmps/DynamicModal";


export function BoardApp() {
    const isFullSidebarMobile = useSelector((storeState) => storeState.systemModule.isFullSidebarMobile)

    return (
        <section className="main-layout grid board-app">
            <AppHeader />
            <main className={`content-container  ${isFullSidebarMobile ? 'mobile-hp' : ''}`}>
                <Sidebar />
                <Outlet />
            </main>
            <DynamicModal />
        </section>
    )
}
