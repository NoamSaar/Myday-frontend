import { useEffect, useState } from "react";
import { SidebarMainNav } from "./SidebarMainNav";
import { SidebarWorkspace } from "./SidebarWorkspace";
import { SidebarBoardNav } from "./SidebarBoardNav";
import { useSelector } from "react-redux";
import { addBoard, loadBoards, removeBoard, setFilterBy, updateBoard } from "../../store/actions/board.actions";
import { useNavigate } from "react-router";
// import { boardService } from "../services/board.service";
// import { LottieAnimation } from "./LottieAnimation";

export function Sidebar() {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
    const currActiveBoard = useSelector((storeState) => storeState.boardModule.currBoard)

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, [filterBy])

    async function loadData() {
        try {
            await loadBoards(filterBy)
        } catch (error) {
            showErrorMsgRedux('Cannot show Boards')
        }
    }

    async function onAddNewBoard() {
        try {
            const newBoard = await addBoard()
            navigate('board/' + newBoard._id)
        } catch (error) {
            console.error("Error adding new Board:", error)
        }
    }

    async function onDeleteBoard(boardId) {
        try {
            await removeBoard(boardId)
            // navigate('board/b101')
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    function deleteBoard(boardId) {
        onDeleteBoard(boardId)
    }

    async function onRenameBoard(board, title) {
        try {
            await updateBoard({ ...board, title })
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    function renameBoard(board, title) {
        onRenameBoard(board, title)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
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
                    onOpenSidebar={onOpenSidebar}
                    isSidebarOpen={isSidebarOpen}
                    isActive={isActive} />
                <SidebarWorkspace
                    onAddNewBoard={onAddNewBoard}
                    isDropdownOpen={isDropdownOpen}
                    isFocus={isFocus}
                    onToggleDropdown={onToggleDropdown}
                    onToggleIsFocus={onToggleIsFocus}
                    filterBy={filterBy}
                    onSetFilter={onSetFilter} />
                <SidebarBoardNav
                    boards={boards}
                    currActiveBoard={currActiveBoard}
                    deleteBoard={deleteBoard}
                    renameBoard={renameBoard}
                />
                {/* <LottieAnimation /> */}
            </article>
        </section>

    )
}
