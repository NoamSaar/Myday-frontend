import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"
import { AddTask } from "./AddTask"
import { useState } from "react"
import { addTask, getBoardById, setActiveTask, updateBoard } from "../../../store/actions/board.actions"

export function TaskList({ groupId, groupColor, highlightText, filterBy }) {
    const board = useSelector((storeState) => storeState.boardModule.filteredBoard)
    const [taskTitle, setTaskTitle] = useState('')

    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const group = board.groups[groupIdx]

    const handleDragEnd = async (result) => {
        try {
            if (!result.destination) return
            const fullBoard = await getBoardById(board._id)
            console.log('fullBoard', fullBoard)

            // const newOrderedTasks = group.tasks

            const filteredSourceGroupIdx = board.groups.findIndex(group => group.id === result.source.droppableId)
            const filteredDestinationGroupIdx = board.groups.findIndex(group => group.id === result.destination.droppableId)
            const filteredSourceGroupTasks = board.groups[filteredSourceGroupIdx].tasks
            const filteredDestinationGroupTasks = board.groups[filteredDestinationGroupIdx].tasks
            console.log('filteredSourceGroupTasks', filteredSourceGroupTasks)
            console.log('filteredDestinationGroupTasks', filteredDestinationGroupTasks)

            const trueSourceGroupIdx = fullBoard.groups.findIndex(group => group.id === result.source.droppableId)
            const trueDestinationGroupIdx = fullBoard.groups.findIndex(group => group.id === result.destination.droppableId)
            const trueSourceGroupTasks = fullBoard.groups[trueSourceGroupIdx].tasks
            const trueDestinationGroupTasks = fullBoard.groups[trueDestinationGroupIdx].tasks
            console.log('trueSourceGroupTasks', trueSourceGroupTasks)
            console.log('trueDestinationGroupTasks', trueDestinationGroupTasks)

            const sourceTaskId = filteredSourceGroupTasks[result.source.index].id
            const destinationTaskId = filteredDestinationGroupTasks[result.destination.index].id
            console.log('sourceTaskId', sourceTaskId)
            console.log('destinationTaskId', destinationTaskId)


            const sourceTaskIdx = trueSourceGroupTasks.findIndex(task => task.id === sourceTaskId)
            const destinationTaskIdx = trueDestinationGroupTasks.findIndex(task => task.id === destinationTaskId)
            console.log('sourceTaskIdx', sourceTaskIdx)
            console.log('destinationTaskIdx', destinationTaskIdx)


            const [removed] = trueSourceGroupTasks.splice(sourceTaskIdx, 1)
            trueDestinationGroupTasks.splice(destinationTaskIdx, 0, removed)
            saveNewOrder(fullBoard, filteredSourceGroupIdx, fullBoard.groups[filteredSourceGroupIdx])
            saveNewOrder(fullBoard, filteredDestinationGroupIdx, fullBoard.groups[filteredDestinationGroupIdx])
        } catch (error) {
            console.log(error)
        }
    }

    async function saveNewOrder(board, groupIdx, group) {
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
                                    <Draggable key={task.id} draggableId={task.id} index={idx} >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`${snapshot.isDragging && 'dragged-task'}`}
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
        </ul >
    )
}