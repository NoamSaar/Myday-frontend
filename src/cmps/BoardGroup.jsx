import { TaskList } from "./TaskList";

export function BoardGroup({ group, titlesOrder, priorities, statuses }) {

    return (
        <section className='board-group'>
            <h4 className="sticky-left">{group.title}</h4>
            <TaskList tasks={group.tasks} titlesOrder={titlesOrder} priorities={priorities} statuses={statuses} />
        </section>
    )
}
