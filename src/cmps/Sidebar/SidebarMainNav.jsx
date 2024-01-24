import { NavLink } from "react-router-dom"
import { HomeIcon, AngleRightIcon, CalendarIcon } from "../../services/svg.service"
import { setCurrBoard } from "../../store/actions/board.actions"
import { useRef } from "react"
import { useSelector } from "react-redux"
import { resetDynamicModal, setDynamicModal } from "../../store/actions/system.actions"

export function SidebarMainNav({ isSidebarOpen, onOpenSidebar, changeWidthVariable }) {

    const { parentId, type, isOpen } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isModalOpen = parentId === `collapse-sidebar-tooltip`
    const titleRef = useRef(null)

    function onStatEnter(txt, name) {
        if (isOpen && type !== 'tooltip') return

        setDynamicModal(
            {
                isOpen: true,
                parentRefCurrent: titleRef.current,
                type: 'tooltip',
                data: { txt },
                parentId: `${name}-tooltip`,
                hasCaret: true,
                isCenter: true,
                isPosBlock: true,
                caretClred: true
            })
    }

    function onStatLeave() {
        if (isModalOpen) resetDynamicModal()
    }

    return (
        <nav className="sidebar-main-nav">
            <NavLink className={`btn btn-nav svg-inherit-color`}
                to="/"
                // title="Home Button"
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
                // title="My Work Button"
                onClick={() => setCurrBoard(null)}
            >
                <CalendarIcon />
                <span>My work</span>
            </NavLink> */}

            <button className={`btn svg-inherit-color btn-menu ${isSidebarOpen ? 'open' : ''}`}
                // title="Menu Button"
                onClick={onOpenSidebar}
                ref={titleRef}
                onMouseEnter={() => onStatEnter(`${isSidebarOpen ? 'Close' : 'Open'} navigation`, 'collapse-sidebar')}
                onMouseLeave={onStatLeave}
            >
                <AngleRightIcon />
            </button>
        </nav>
    )
}