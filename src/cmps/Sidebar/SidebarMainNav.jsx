import { NavLink } from "react-router-dom";
import { setCurrBoard } from "../../store/actions/board.actions";
import { HomeIcon, AngleRightIcon, CalendarIcon } from "../../services/svg.service"

export function SidebarMainNav({ isActive, isSidebarOpen, onOpenSidebar }) {
    return (
        <nav className="sidebar-main-nav">
            <NavLink className={`btn btn-nav svg-inherit-color ${isActive ? 'active' : ''}`}
                to="/"
                title="Home Button"
                onClick={() => setCurrBoard(null)}>

                <HomeIcon />
                <span>Home</span>
            </NavLink>

            <NavLink className={`btn btn-nav svg-inherit-color ${isActive ? 'active' : ''}`}
                to="/workspace"
                title="My Work Button"
                onClick={() => setCurrBoard(null)}>

                <CalendarIcon />
                <span>My work</span>
            </NavLink>

            <button className={`btn btn-menu ${isSidebarOpen ? 'open' : ''}`}
                title="Menu Button"
                onClick={onOpenSidebar}>
                <AngleRightIcon />
            </button>
        </nav>
    )
}