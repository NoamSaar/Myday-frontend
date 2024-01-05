import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"

export function TaskList({ groupId }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    let group = board.groups[groupIdx]


    return (
        <ul className="clean-list task-list">


            {group.tasks.map(task => {
                return <TaskPreview key={task.id} task={task} groupId={groupId} />
            })}
        </ul>

    )
}
