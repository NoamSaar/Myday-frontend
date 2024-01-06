import { useState } from "react"
import { useSelector } from "react-redux"

export function AddTask({ title, onSetTitle, addTask, groupColor, onSetActiveTask, groupId }) {
    const [isEditing, setIsEditing] = useState(false)
    const activeTask = useSelector((storeState) => storeState.boardModule.activeTask)

    function onTitleClick() {
        setIsEditing(true)
        onSetActiveTask(groupId)
    }

    async function onAddTask(ev) {
        try {
            ev.preventDefault()
            setIsEditing(false)
            onSetActiveTask(null)
            if (!title) {
                onSetTitle('')
                return
            }
            addTask()
        } catch (error) {
            console.error("Error changing task title:", error)
        }
    }
    return (
        <ul className="clean-list task-preview-container add-task sticky-left">
            <div className="task-row-placeholder sticky-left"></div>

            <ul className={`${activeTask === groupId && 'active'} clean-list task-preview`}>
                <div style={{ backgroundColor: groupColor }} className="color-display sticky-left-36"></div>
                <div className="task-title-container">


                    <li className="task-selection">
                        <input disabled type="checkbox" />
                    </li>
                    <li className="task-title single-task">

                        {isEditing ? (
                            <form onSubmit={onAddTask}>
                                <input
                                    autoFocus
                                    value={title}
                                    onChange={onSetTitle}
                                    className="reset focused-input"
                                    type="text"
                                    onBlur={onAddTask}
                                    placeholder="+ Add task"
                                />
                            </form>
                        ) : (
                            <span className="editable-txt" onClick={onTitleClick}>+ Add task</span>

                        )}
                    </li>
                </div>

                <div className="line-end"></div>
            </ul>
        </ul>
    )
}
