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
                <nav className="sidebar-main-nav">
                    <NavLink to="/" className="btn" >
                        <img src="../../public/icons/Home.svg" alt="home-icon" />
                        <span>Home</span>
                    </NavLink>

                    <NavLink to="/board" className="btn" >
                        <img src="../../public/icons/Calendar.svg" alt="home-icon" />
                        <span>My Work</span>
                    </NavLink>
                    <button className="btn-menu" onClick={onOpenSidebar} title="menu-btn">x</button>
                </nav>

                <section className="sidebar-workspace">
                    <div className="workspace-section">
                        <div className="workspace-logo">
                            M
                            <div className="btn">
                                <img src="../../public/icons/Home.svg" alt="home-icon" />
                            </div>
                        </div>
                        <span>Main workspace</span>
                    </div>
                    <div className="sidebar-filter">
                        <div className="search-section">
                            <div className="btn">
                                <img src="../../public/icons/Search.svg" alt="search-icon" />
                            </div>
                            <input type="text" />
                        </div>
                        <button className="btn clrblue">
                            <img src="../../public/icons/AddSmall.svg" alt="add-icon" />
                        </button>
                    </div>
                </section>

                <nav className="sidebar-board-nav">
                </nav>
            </article>
        </section>

    )
}
