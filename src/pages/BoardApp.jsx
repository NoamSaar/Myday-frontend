import { Outlet } from "react-router";
import { useSelector } from "react-redux";

import { Sidebar } from "../cmps/Sidebar/Sidebar";
import { DynamicModal } from "../cmps/DynamicModal";
import { BoardAppHeader } from "../cmps/BoardAppHeader";


export function BoardApp() {
    const isFullSidebarMobile = useSelector((storeState) => storeState.systemModule.isFullSidebarMobile)

    return (
        <section className="main-layout grid board-app">
            <BoardAppHeader />
            <main className={`content-container  ${isFullSidebarMobile ? 'mobile-hp' : ''}`}>
                <Sidebar />
                <Outlet />
            </main>
            <DynamicModal />
        </section>
    )
}
