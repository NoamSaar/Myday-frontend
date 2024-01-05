
export function AddTask({ title, onSetTitle, onAddTask }) {
    return (
        <ul className="clean-list task-preview-container add-task">

            <ul className="clean-list task-preview">
                <div className="sticky-left-36 task-title-container">
                    <li className="task-selection">
                        <input disabled type="checkbox" />
                    </li>
                    <li className="task-title single-task">
                        <form onSubmit={onAddTask}>
                            <input value={title} onChange={onSetTitle} className="reset" type="text" placeholder="+ Add task" />
                        </form>
                    </li>
                </div>

                <div className="line-end"></div>
            </ul>
        </ul>
    )
}
