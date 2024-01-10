import { TaskHeaderList } from "./TaskHeaderList";
import { TaskList } from "./TaskList";

export function TaskTable({ groupColor, titlesOrder, groupId, highlightText, filterBy }) {
    return (
        <div className="task-table">
            <TaskHeaderList groupColor={groupColor} titlesOrder={titlesOrder} />

            <TaskList titlesOrder={titlesOrder}
                groupId={groupId}
                highlightText={highlightText}
                filterBy={filterBy}
                groupColor={groupColor} />
        </div>
    )
}
