import { useState } from "react";

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    function onOpenSidebar() {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <section className="sidebar-container">
            <article className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="btn-menu" onClick={onOpenSidebar}>x</button>
                {/* <h2>I'm sidebar</h2> */}
                <nav className="app-nav">
                    {/* <NavLink to="/" >Home</NavLink> */}
                    {/* <NavLink to="/board" >Board</NavLink> */}
                </nav>
            </article>
        </section>

    )
}
