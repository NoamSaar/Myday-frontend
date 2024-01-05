import { NavLink } from "react-router-dom";

export function SidebarMainNav({ onToggleIsActive, isActive, isSidebarOpen, onOpenSidebar }) {
    return (
        <nav className="sidebar-main-nav">
            <NavLink to="/" title="Home Button" className={`btn ${isActive ? 'active' : ''}`}
                onClick={onToggleIsActive}>
                <img src="../../public/icons/Home.svg" alt="home-icon" />
                <span>Home</span>
            </NavLink>

            <NavLink title="My Work Button" to="/board" className={`btn ${isActive ? 'active' : ''}`}
                onClick={onToggleIsActive}>
                <img src="../../public/icons/Calendar.svg" alt="home-icon" />
                <span>My work</span>
            </NavLink>
            <button title="Menu Button" className={`btn btn-menu ${isSidebarOpen ? 'open' : ''}`}
                onClick={onOpenSidebar}>
                <img src="../../public/icons/DropdownChevronRight.svg" alt="home-icon" />
            </button>
        </nav>
    )
}