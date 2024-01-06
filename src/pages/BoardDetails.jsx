import { Outlet, useParams } from "react-router";
import { BoardGroup } from "../cmps/Board/Group/BoardGroup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BoardHeader } from "../cmps/Board/BoardHeader";
import { addGroup, loadBoard, setFilterBy } from "../store/actions/board.actions";

export function BoardDetails() {
    const { boardId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    useEffect(() => {
        _loadBoard()
        // TODO : Emit watch on the user + add a listener for when user changes
        // socketService.emit(SOCKET_EMIT_BOARD_WATCH, boardId)
        // socketService.on(SOCKET_EVENT_BOARD_UPDATED, (board) => {
        //     setBoard(board)
        // })

        // return () => socketService.off(SOCKET_EVENT_BOARD_UPDATED)
    }, [boardId, filterBy])

    async function _loadBoard() {
        try {
            const loadedBoard = await loadBoard(boardId)
        } catch (err) {
            console.error('Error loading board:', err)
            // showErrorMsg('Cannot load board')
        }
    }

    async function onAddGrop() {
        try {
            addGroup(board._id)
        } catch (error) {
            console.error("Error adding group:", error)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    // console.log('filterBy from BoardDetails', filterBy)
    const { txt } = filterBy

    if (!board) return <div className="board-details">Loading...</div>
    return (
        <section className="board-details">
            <BoardHeader
                board={board}
                filterBy={{ txt }}
                onSetFilter={onSetFilter}
            />

            <div className="board-content">

                {board.groups.map(group => <BoardGroup key={group.id} group={group} titlesOrder={board.titlesOrder} />)}

                <div className="btn add-group-btn sticky-left-40" onClick={onAddGrop}>
                    <img src="../../../public/icons/add.svg" />
                    Add new group
                </div>

                <Outlet />
                {/* the outlet is to display the nested route- task details */}
            </div>

        </section>
    )
}
