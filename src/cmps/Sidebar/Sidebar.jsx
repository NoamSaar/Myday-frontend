import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { showErrorMsg, showSuccessMsg } from "../../store/actions/system.actions"

import { SidebarMainNav } from "./SidebarMainNav"
import { SidebarWorkspace } from "./SidebarWorkspace"
import { SidebarBoardNav } from "./SidebarBoardNav"
// import { LottieAnimation } from "./LottieAnimation"

import { addBoard, loadBoards, removeBoard, setFilterBy, updateBoard } from "../../store/actions/board.actions"

export function Sidebar() {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
    const currActiveBoard = useSelector((storeState) => storeState.boardModule.currBoard)

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        _loadBoards()
    }, [filterBy])

    async function _loadBoards() {
        try {
            await loadBoards(filterBy)
        } catch (err) {
            console.error('Error loading Boards:', err)
            showErrorMsg('Cannot load Boards')
        }
    }

    async function onAddNewBoard() {
        try {
            const newBoard = await addBoard()
            navigate('board/' + newBoard._id)
        } catch (err) {
            console.error('Error adding new Board:', err)
            showErrorMsg('Cannot add new Board')
        }
    }

    async function _onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('We successfully deleted the board')
            // navigate('board/b101')
        } catch (err) {
            console.error('Error removing task:', err)
            showErrorMsg('Cannot delete Board')
        }
    }

    async function _onUpdateBoard(board, title) {
        try {
            await updateBoard({ ...board, title })
        } catch (err) {
            console.error('Error removing task:', err)
            showErrorMsg('Cannot update Board')
        }
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

    function onUpdateBoard(board, title) {
        _onUpdateBoard(board, title)
    }

    function onRemoveBoard(boardId) {
        _onRemoveBoard(boardId)
    }


    return (
        <section className="sidebar-container">
            <article className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <SidebarMainNav
                    isSidebarOpen={isSidebarOpen}
                    onOpenSidebar={onOpenSidebar}
                />
                <SidebarWorkspace
                    filterBy={filterBy}
                    isDropdownOpen={isDropdownOpen}
                    onAddNewBoard={onAddNewBoard}
                    onToggleDropdown={onToggleDropdown}
                    onSetFilter={onSetFilter} />
                <SidebarBoardNav
                    boards={boards}
                    currActiveBoard={currActiveBoard}
                    removeBoard={onRemoveBoard}
                    updateBoard={onUpdateBoard}
                />
                {/* <LottieAnimation /> */}
            </article>
        </section>

    )
}
