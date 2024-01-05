import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"

export function TaskList({ groupId }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    let group = board.groups[groupIdx]


    return (
        <ul className="clean-list task-list">
            <ul className="clean-list task-header-list">
                <div className="sticky-left-36 task-title-container">

                    <li className="task-selection">
                        <input type="checkbox" />
                    </li>

                    <li className="task-title">Task</li>
                </div>

                {board.titlesOrder.map((title, idx) => {
                    return <li key={idx} className={`${title.toLowerCase()}-col`}>
                        {title}
                    </li>
                })}
                <li className="line-end"></li>
            </ul>

            {group.tasks.map(task => {
                return <TaskPreview key={task.id} task={task} groupId={groupId} />
            })}
        </ul>

    )
}
