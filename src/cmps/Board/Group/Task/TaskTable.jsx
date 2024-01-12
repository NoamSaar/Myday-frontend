import { GroupSummary } from "../Summary/GroupSummary";
import { TaskHeaderList } from "./TaskHeaderList";
import { TaskList } from "./TaskList";

export function TaskTable({ groupColor, titlesOrder, group, highlightText, filterBy, board }) {
    return (
        <div className="full-width subgrid full-grid-column task-table">
            <TaskHeaderList groupColor={groupColor} titlesOrder={titlesOrder} />

            <TaskList titlesOrder={titlesOrder}
                groupId={group.id}
                highlightText={highlightText}
                filterBy={filterBy}
                groupColor={groupColor} />

            <GroupSummary group={group} titlesOrder={titlesOrder} board={board} />
        </div>
    )
}
