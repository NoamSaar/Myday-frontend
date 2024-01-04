import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"

export function TaskList({ tasks, boardId }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)

    return (
        <ul className="clean-list task-list">
            <ul className="clean-list task-header-list">
                <div className="sticky-left task-title-container">

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
            </ul>

            {tasks.map(task => {
                return <TaskPreview key={task.id} task={task} boardId={boardId} />
            })}
        </ul>

    )
}
