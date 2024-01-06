import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { SidebarBoardLink } from './SidebarBoardLink'
import { saveBoards } from '../../store/actions/board.actions'

export function SidebarBoardNav({ boards, currActiveBoard, openModalId }) {
    const handleDragEnd = (result) => {
        if (!result.destination) return

        const newOrderedBoards = Array.from(boards)
        const [removed] = newOrderedBoards.splice(result.source.index, 1)
        newOrderedBoards.splice(result.destination.index, 0, removed)
        saveNewOrder(newOrderedBoards)
    }

    async function saveNewOrder(boards) {
        try {
            await saveBoards(boards)
        } catch (error) {
            showErrorMsgRedux('Cannot save Boards')
        }
    }
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="boards">
                {(provided) => (
                    <nav className="sidebar-board-nav" {...provided.droppableProps} ref={provided.innerRef}>
                        {boards.map((board, index) => (
                            <Draggable key={board._id} draggableId={board._id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <SidebarBoardLink boards={boards} board={board} currActiveBoard={currActiveBoard} openModalId={openModalId} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </nav>
                )}
            </Droppable>
        </DragDropContext>
    )
}
