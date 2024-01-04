import { TaskList } from "./TaskList";

export function BoardGroup({ group, titlesOrder }) {
    return (
        <section className='board-group'>
            <h4>{group.title}</h4>
            <TaskList tasks={group.tasks} titlesOrder={titlesOrder} />
        </section>
    )
}
