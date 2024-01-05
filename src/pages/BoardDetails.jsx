import { Outlet, useParams } from "react-router";
import { BoardGroup } from "../cmps/BoardGroup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { BoardHeader } from "../cmps/BoardHeader";
import { setCurBoard } from "../store/actions/board.actions";

export function BoardDetails() {
    const [board, setBoard] = useState(null)
    const { boardId } = useParams()
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
            setBoard(board)
            setCurBoard(board)
        } catch (error) {
            console.log('Had issues in board details', error)
            // showErrorMsg('Cannot load board')
        }
    }


    if (!board) return <div className="board-details">Loading...</div>
    return (
        <section className="board-details">
            <BoardHeader board={board} />

            {board.groups.map(group => <BoardGroup key={group.id} group={group} titlesOrder={board.titlesOrder} />)}

            <div className="btn add-group-btn sticky-left-40">
                <img src="../../../public/icons/add.svg" />
                Add new group
            </div>

            <Outlet />
            {/* the outlet is to display the nested route- task details */}
        </section>
    )
}
