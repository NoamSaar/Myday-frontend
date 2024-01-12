import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { BoardGroup } from "./BoardGroup";
import { useState } from "react";
import { updateBoardOrder } from "../../../store/actions/board.actions";

export function GroupList({ board, isFocusLastGroup, onSetIsFocusLastGroup }) {
    const [isGroupsCollapsed, setIsGroupsCollapsed] = useState(false)

    const handleDragEnd = (result) => {
        setIsGroupsCollapsed(false)
        if (!result.destination) return

        const boardToSave = { ...board }
        const newOrderedGroups = board.groups
        const [removed] = newOrderedGroups.splice(result.source.index, 1)
        newOrderedGroups.splice(result.destination.index, 0, removed)
        saveNewOrder(boardToSave)
    }

    async function saveNewOrder(boardToSave) {
        try {
            await updateBoardOrder(boardToSave)
        } catch (err) {
            console.log('Cannot save board:', err)
            // showErrorMsg('Cannot save group')
        }
    }

    function onBeforeDragStart() {
        setIsGroupsCollapsed(true)
    }

    return (
        <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={handleDragEnd}>
            <Droppable droppableId={board._id}>
                {(provided) => (
                    <ul className="clean-list group-list"  {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            board.groups.map((group, idx) => (
                                <Draggable key={group.id} draggableId={group.id} index={idx} >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >

                                            <BoardGroup
                                                key={group.id}
                                                group={group}
                                                titlesOrder={board.titlesOrder}
                                                isEditingTitle={isFocusLastGroup && idx === board.groups.length - 1}
                                                onTitleEditLeave={onSetIsFocusLastGroup}
                                                isGroupsCollapsed={isGroupsCollapsed}

                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </ul>


                )}
            </Droppable>
        </DragDropContext>
    )
}
