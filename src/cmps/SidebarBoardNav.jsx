import { NavLink } from "react-router-dom";

export function SidebarBoardNav({ onToggleIsActive, isActive }) {
    return (
        <nav className="sidebar-board-nav">
            <NavLink to="/board/b101" title="Home Button" className={`btn ${isActive ? 'active' : ''}`}
                onClick={onToggleIsActive}>
                <img src="../../public/icons/Board.svg" alt="home-icon" />
                <span>Frontend</span>
            </NavLink>

            <NavLink title="My Work Button" to="/board/b101" className={`btn ${isActive ? 'active' : ''}`}
                onClick={onToggleIsActive}>
                <img src="../../public/icons/Board.svg" alt="home-icon" />
                <span>Backend</span>
            </NavLink>
        </nav>
    )
}