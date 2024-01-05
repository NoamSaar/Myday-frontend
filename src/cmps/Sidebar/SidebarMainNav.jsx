import { NavLink } from "react-router-dom";

export function SidebarMainNav({ isActive, isSidebarOpen, onOpenSidebar }) {
    return (
        <nav className="sidebar-main-nav">
            <NavLink className={`btn btn-nav ${isActive ? 'active' : ''}`}
                to="/"
                title="Home Button">

                <img src="../../public/icons/Home.svg" alt="home-icon" />
                <span>Home</span>
            </NavLink>

            <NavLink className={`btn btn-nav ${isActive ? 'active' : ''}`}
                to="/board"
                title="My Work Button">

                <img src="../../public/icons/Calendar.svg" alt="home-icon" />
                <span>My work</span>
            </NavLink>

            <button className={`btn btn-menu ${isSidebarOpen ? 'open' : ''}`}
                title="Menu Button"
                onClick={onOpenSidebar}>
                <img src="../../public/icons/DropdownChevronRight.svg" alt="home-icon" />
            </button>
        </nav>
    )
}