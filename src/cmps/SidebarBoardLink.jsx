import { NavLink } from "react-router-dom";

export function SidebarBoardLink({ title, id, isActive, onToggleIsActive }) {
    return (
        <NavLink title={`${title} Board`} to={`/board/${id}`} className={`btn ${isActive ? 'active' : ''}`}
            onClick={onToggleIsActive}>
            <img src="../../public/icons/Board.svg" alt="home-icon" />
            <span>{title}</span>
            <img className="btn btn-board-menu" src="../../public/icons/menu.svg" alt="Board Menu" />
        </NavLink>
    )
}