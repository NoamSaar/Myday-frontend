import { useEffect, useState } from "react";
import { SidebarMainNav } from "./SidebarMainNav";
import { SidebarWorkspace } from "./SidebarWorkspace";
import { SidebarBoardNav } from "./SidebarBoardNav";
import { boardService } from "../../services/board.service.local";
import { useSelector } from "react-redux";
import { loadBoards } from "../../store/actions/board.actions";
import { useNavigate } from "react-router";
// import { boardService } from "../services/board.service";
// import { LottieAnimation } from "./LottieAnimation";

export function Sidebar() {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadBoards()
    }, [])


    async function onAddNewBoard() {
        const newBoard = await boardService.save()
        navigate('board/' + newBoard._id)
    }

    function onOpenSidebar() {
        setIsSidebarOpen(!isSidebarOpen)
    }

    function onToggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen)
    }

    function onToggleIsActive() {
        setIsActive(!isActive)
    }

    function onToggleIsFocus() {
        setIsFocus(!isFocus)
    }

    return (
        <section className="sidebar-container">
            <article className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <SidebarMainNav
                    onToggleIsActive={onToggleIsActive}
                    onOpenSidebar={onOpenSidebar}
                    isSidebarOpen={isSidebarOpen}
                    isActive={isActive} />
                <SidebarWorkspace
                    onAddNewBoard={onAddNewBoard}
                    isDropdownOpen={isDropdownOpen}
                    isFocus={isFocus}
                    onToggleDropdown={onToggleDropdown}
                    onToggleIsFocus={onToggleIsFocus} />
                <SidebarBoardNav
                    boards={boards}
                    isActive={isActive} />
                {/* <LottieAnimation /> */}
            </article>
        </section>

    )
}
