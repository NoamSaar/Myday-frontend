import { Outlet } from "react-router";
import { AppHeader } from "../cmps/AppHeader";
import { Sidebar } from "../cmps/Sidebar/Sidebar";
import { DynamicModal } from "../cmps/DynamicModal";


export function BoardApp() {
    return (
        <section className="main-layout grid board-app">
            <AppHeader />
            <main className="content-container grid column">
                <Sidebar />
                <Outlet />
            </main>
            <DynamicModal />
        </section>
    )
}
