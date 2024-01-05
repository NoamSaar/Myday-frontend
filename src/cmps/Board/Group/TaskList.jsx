import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"
import { AddTask } from "./AddTask"
import { useState } from "react"
import { addTask } from "../../../store/actions/board.actions"

export function TaskList({ groupId }) {
    const [taskTitle, setTaskTitle] = useState('')
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const group = board.groups[groupIdx]

    function onSetTaskTitle({ target }) {
        const title = target.value
        setTaskTitle(title)
    }

    async function onAddTask(ev) {
        try {
            ev.preventDefault()
            await addTask(board._id, groupId, taskTitle)
            setTaskTitle('')
        } catch (error) {
            console.error("Error adding task:", error)
        }
    }

    return (
        <ul className="clean-list task-list">


            {group.tasks.map(task => {
                return <TaskPreview key={task.id} task={task} groupId={groupId} groupColor={group.color} />
            })}

            <AddTask title={taskTitle} onSetTitle={onSetTaskTitle} onAddTask={onAddTask} groupColor={group.color} />

        </ul>


    )
}
