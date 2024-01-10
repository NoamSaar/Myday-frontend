import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"
import { AddTask } from "./AddTask"
import { useState } from "react"
import { addTask, setActiveTask, updateBoard } from "../../../store/actions/board.actions"

export function TaskList({ groupId, groupColor, highlightText, filterBy }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const [taskTitle, setTaskTitle] = useState('')

    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const group = board.groups[groupIdx]

    const handleDragEnd = (result) => {
        if (!result.destination) return

        const newOrderedTasks = group.tasks
        const [removed] = newOrderedTasks.splice(result.source.index, 1)
        newOrderedTasks.splice(result.destination.index, 0, removed)
        saveNewOrder()
    }

    async function saveNewOrder() {
        try {
            const newBoard = { ...board }
            newBoard.groups.splice(groupIdx, 1, group)
            await updateBoard(newBoard)
        } catch (err) {
            console.log('Cannot save group:', err)
            showErrorMsg('Cannot save group')
        }
    }

    function onSetTaskTitle({ target }) {
        const title = target.value
        setTaskTitle(title)
    }

    async function onAddTask() {
        try {
            await addTask(board._id, groupId, taskTitle)
            setTaskTitle('')
        } catch (err) {
            console.err('Error adding task:', err)
            showErrorMsg('Cannot add Task')
        }
    }

    function onSetActiveTask(taskId) {
        setActiveTask(taskId)
    }

    return (
        <ul className="clean-list flex column relative subgrid full-grid-column full-width task-list">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={group.id}>
                    {(provided) => (
                        <div className="subgrid full-grid-column tasks-container" {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                group.tasks.map((task, idx) => (
                                    <Draggable key={task.id} draggableId={task.id} index={idx}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TaskPreview
                                                    key={task.id}
                                                    task={task}
                                                    groupId={groupId}
                                                    groupColor={groupColor}
                                                    onSetActiveTask={onSetActiveTask}
                                                    highlightText={highlightText}
                                                    filterBy={filterBy}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <AddTask
                groupId={groupId}
                groupColor={groupColor}
                title={taskTitle}
                onSetTitle={onSetTaskTitle}
                onSetActiveTask={onSetActiveTask}
                addTask={onAddTask}
            />
        </ul>
    )
}