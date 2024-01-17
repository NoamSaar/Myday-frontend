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

            <div className={`btn btn-nav svg-inherit-color`}
                title="My Work Button"
            >
                <CalendarIcon />
                <span>My work</span>
            </div>
            {/* <NavLink className={`btn btn-nav svg-inherit-color`}
                to="/workspace"
                title="My Work Button"
                onClick={() => setCurrBoard(null)}
            >
                <CalendarIcon />
                <span>My work</span>
            </NavLink> */}

            <button className={`btn btn-menu ${isSidebarOpen ? 'open' : ''}`}
                title="Menu Button"
                onClick={onOpenSidebar}
            >
                <AngleRightIcon />
            </button>
        </nav>
    )
}