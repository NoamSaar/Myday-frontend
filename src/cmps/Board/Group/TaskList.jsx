import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"
import { AddTask } from "./AddTask"
import { useEffect, useState } from "react"
import { addTask, getBoard, setActiveTask, updateBoard } from "../../../store/actions/board.actions"

export function TaskList({ groupId, groupColor, highlightText, filterBy }) {
    const [taskTitle, setTaskTitle] = useState('')
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const group = board.groups[groupIdx]
    // let tasks = board.groups[groupIdx].tasks

    // useEffect(() => {
    //     console.log('here')
    //     tasks = board.groups[groupIdx].tasks
    //     console.log('tasks', tasks)
    // }, [board])

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
        } catch (error) {
            console.log('Cannot save group:', error)
        }
    }

    // async function handleDragEnd(result) {
    //     try {

    //         const fullBoard = await getBoard(board._id)
    //         console.log('fullBoard', fullBoard)
    //         const initGroupIdx = fullBoard.groups.findIndex(group => group.id === groupId)
    //         const initGroup = fullBoard.groups[initGroupIdx]
    //         const newOrderedTasks = initGroup.tasks
    //         console.log('newOrderedTasks', newOrderedTasks)

    //         const [removed] = newOrderedTasks.splice(result.source.index, 1)
    //         newOrderedTasks.splice(result.destination.index, 0, removed)
    //         console.log('initGroup.tasks', initGroup.tasks)

    //         saveNewOrder(fullBoard, initGroupIdx, initGroup)
    //         if (!result.destination) return
    //     } catch (error) {
    //         console.log('Cannot move task:', error)

    //     }

    // }


    // async function saveNewOrder(newBoard, groupIdx, group) {
    //     try {
    //         newBoard.groups.splice(groupIdx, 1, group)
    //         await updateBoard(newBoard)
    //     } catch (error) {
    //         console.log('Cannot save group:', error)
    //     }
    // }

    async function saveNewOrder() {
        try {
            const newBoard = { ...board }
            newBoard.groups.splice(groupIdx, 1, group)
            await updateBoard(newBoard)
        } catch (error) {
            console.log('Cannot save group:', error)
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
        } catch (error) {
            console.error("Error adding task:", error)
        }
    }

    function onSetActiveTask(taskId) {
        setActiveTask(taskId)
    }

    return (
        <ul className="clean-list task-list">

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={group.id}>
                    {(provided) => (
                        <div className="tasks-container" {...provided.droppableProps} ref={provided.innerRef}>
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

            <AddTask title={taskTitle} onSetTitle={onSetTaskTitle} addTask={onAddTask} groupColor={groupColor} onSetActiveTask={onSetActiveTask} groupId={groupId} />

        </ul>


    )
}
