
export function AddTask({ title, onSetTitle, onAddTask, groupColor }) {
    return (
        <ul className="clean-list task-preview-container add-task">

            <ul className="clean-list task-preview">
                <div style={{ backgroundColor: groupColor }} className="color-display sticky-left-36"></div>
                <div className="task-title-container">


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
