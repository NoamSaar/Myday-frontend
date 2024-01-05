import { NavLink } from "react-router-dom";

export function SidebarBoardLink({ title, id, isActive, onToggleIsActive }) {
    return (
        <NavLink className={`btn ${isActive ? 'active' : ''}`}
            to={`/board/${id}`}
            title={`${title} Board`}
            onClick={onToggleIsActive}>
            <img src="../../public/icons/Board.svg" alt="home-icon" />
            <span>{title}</span>
            <img className="btn btn-option-menu" src="../../public/icons/menu.svg" alt="Board Menu" />
        </NavLink>
    )
}