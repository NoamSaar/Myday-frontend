import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router"

import { addGroup, loadBoard, loadFilteredBoard, setFilterBy, getTask } from "../store/actions/board.actions"

import { BigPlusIcon } from "../services/svg.service"
import { BoardGroup } from "../cmps/Board/Group/BoardGroup"
import { BoardHeader } from "../cmps/Board/BoardHeader"
import { TaskDetails } from "./TaskDetails"

export function BoardDetails() {
    const fullBoard = useSelector((storeState) => storeState.boardModule.currBoard)
    const board = useSelector((storeState) => storeState.boardModule.filteredBoard)
    const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    const modalData = useSelector((storeState) => storeState.systemModule.dynamicModal)
    // const user = useSelector((storeState) => storeState.userModule.loggedinUser)

    const [isFocusLastGroup, setIsFocusLastGroup] = useState(false)
    const { boardId } = useParams()

    useEffect(() => {
        _loadBoard()
        // TODO : Emit watch on the user + add a listener for when user changes
        // socketService.emit(SOCKET_EMIT_BOARD_WATCH, boardId)
        // socketService.on(SOCKET_EVENT_BOARD_UPDATED, (board) => {
        //     setBoard(board)
        // })

        // return () => socketService.off(SOCKET_EVENT_BOARD_UPDATED)
    }, [boardId])

    useEffect(() => {
        loadFilteredBoard()

    }, [filterBy])

    async function _loadBoard() {
        try {
            await loadBoard(boardId)
            // loadFilteredBoard()
        } catch (err) {
            console.error('Error loading board:', err)
        }
    }

    async function onAddGrop() {
        try {
            await addGroup(board._id)
            setIsFocusLastGroup(true)
        } catch (err) {
            console.error("Error adding group:", err)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    const { txt } = filterBy

    if (isLoading || !board) return <div className="board-details">Loading...</div>
    return (
        <section className={`board-details ${modalData.isOpen && 'overflow-hidden'}`}>
            <BoardHeader
                board={board}
                filterBy={{ txt }}
                onSetFilter={onSetFilter}
            />

            {board.groups.map((group, idx) =>
                <BoardGroup
                    key={group.id}
                    group={group}
                    titlesOrder={board.titlesOrder}
                    isEditingTitle={isFocusLastGroup && idx === board.groups.length - 1}
                    onTitleEditLeave={() => setIsFocusLastGroup(false)}
                />)}

            <button className="btn add-group-btn sticky-left-40" onClick={onAddGrop}>
                <BigPlusIcon />
                Add new group
            </button>

            <Outlet
                routes={{
                    'task/:taskId': { element: <TaskDetails boardId={boardId} /> },
                    // 'activity_log': { element: <ActivityLog boardId={boardId} /> },
                }}
            />
            {/* the outlet is to display the nested route- task details */}
            {/* Pass different props to each component using the routes object */}

        </section>
    )
}
