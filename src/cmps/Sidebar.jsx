import { useState } from "react";
import { NavLink } from "react-router-dom";


export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    function onOpenSidebar() {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <section className="sidebar-container">
            <article className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-nav">
                    <NavLink to="/" className="sidebar-btn flex align-center" >
                        <img src="../../public/icons/Home.svg" alt="home-icon" />
                        <span>Home</span>
                    </NavLink>

                    <NavLink to="/board" className="sidebar-btn flex justify-center align-center" >
                        <img src="../../public/icons/Calendar.svg" alt="home-icon" />
                        <span>My Work</span>
                    </NavLink>
                    <button className="btn-menu" onClick={onOpenSidebar} title="menu-btn">x</button>
                </div>
                <nav className="app-nav">
                </nav>
            </article>
        </section>

    )
}
