import { NavLink } from "react-router-dom"
import { HomeIcon, AngleRightIcon, CalendarIcon } from "../../services/svg.service"
import { setCurrBoard } from "../../store/actions/board.actions"

export function SidebarMainNav({ isSidebarOpen, onOpenSidebar, changeWidthVariable }) {
    return (
        <nav className="sidebar-main-nav">
            <NavLink className={`btn btn-nav svg-inherit-color`}
                to="/"
                title="Home Button"
                onClick={() => {
                    changeWidthVariable(250)
                    setCurrBoard(null)
                }}
            >
                <HomeIcon />
                <span>Home</span>
            </NavLink>

            <NavLink className={`btn btn-nav svg-inherit-color`}
                to="/workspace"
                title="My Work Button"
                onClick={() => setCurrBoard(null)}
            >
                <CalendarIcon />
                <span>My work</span>
            </NavLink>

            <button className={`btn svg-inherit-color btn-menu ${isSidebarOpen ? 'open' : ''}`}
                title="Menu Button"
                onClick={onOpenSidebar}
            >
                <AngleRightIcon />
            </button>
        </nav>
    )
}