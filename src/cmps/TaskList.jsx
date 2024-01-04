import { TaskPreview } from "./TaskPreview"

export function TaskList({ tasks, titlesOrder, priorities, statuses }) {
    return (
        <ul className="clean-list task-list">
            <ul className="clean-list task-header-list">
                <li className="task-title">Task</li>
                {titlesOrder.map((title, idx) => {
                    return <li key={idx}>
                        {title}
                    </li>
                })}
            </ul>

            {tasks.map(task => {
                return <TaskPreview key={task.id} task={task} titlesOrder={titlesOrder} priorities={priorities} statuses={statuses} />
            })}
        </ul>
    )
}
