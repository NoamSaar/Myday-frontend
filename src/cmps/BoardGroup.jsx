import { TaskList } from "./TaskList";

export function BoardGroup({ group, titlesOrder }) {


    return (
        <section className='board-group'>
            <div className="board-title-container sticky-left">
                <img className="btn" src="../../../public/icons/menu.svg" />
                <img className="down-arrow" src="../../../public/icons/NavigationChevronDown.svg" title="Collapse group" />
                <h4 >{group.title}</h4>
                <p>{group.tasks.length} Tasks</p>
            </div>
            <TaskList tasks={group.tasks} titlesOrder={titlesOrder} />
        </section>
    )
}
