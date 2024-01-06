import { Outlet, useParams } from "react-router";
import { BoardGroup } from "../cmps/Board/Group/BoardGroup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { BoardHeader } from "../cmps/Board/BoardHeader";
import { addGroup, setCurrBoard } from "../store/actions/board.actions";
import { BigPlusIcon, PlusIcon } from "../services/svg.service";

export function BoardDetails() {
    const { boardId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)

    useEffect(() => {
        loadBoard()
        // TODO : Emit watch on the user + add a listener for when user changes
        // socketService.emit(SOCKET_EMIT_BOARD_WATCH, boardId)
        // socketService.on(SOCKET_EVENT_BOARD_UPDATED, (board) => {
        //     setBoard(board)
        // })

        // return () => socketService.off(SOCKET_EVENT_BOARD_UPDATED)
    }, [boardId])

    async function loadBoard() {
        try {
            const board = await boardService.getById(boardId)
            setCurrBoard(board)
        } catch (error) {
            console.log('Had issues in board details', error)
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



    if (!board) return <div className="board-details">Loading...</div>
    return (
        <section className="board-details">
            <BoardHeader board={board} />

            <div className="board-content">

                {board.groups.map(group => <BoardGroup key={group.id} group={group} titlesOrder={board.titlesOrder} />)}

                <button className="btn add-group-btn sticky-left-40" onClick={onAddGrop}>
                    <BigPlusIcon />
                    Add new group
                </button>

                <Outlet />
                {/* the outlet is to display the nested route- task details */}
            </div>

        </section>
    )
}
