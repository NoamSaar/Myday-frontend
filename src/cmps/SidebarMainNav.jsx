import { NavLink } from "react-router-dom";

export function SidebarMainNav({ onToggleIsActive, isActive, onOpenSidebar }) {
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
            <button title="Menu Button" className="btn-menu" onClick={onOpenSidebar} >x</button>
        </nav>
    )
}