import { useState } from "react"
import { useSelector } from "react-redux"
import { showErrorMsg } from "../../../store/actions/system.actions"
import { EditableTxt } from "../../EditableTxt"

export function AddTask({ title, onSetTitle, addTask, groupColor, onSetActiveTask, groupId }) {
    const activeTask = useSelector((storeState) => storeState.boardModule.activeTask)
    const [isInputFocus, setIsInputFocus] = useState(false)

    function onTitleClick() {
        setIsInputFocus(true)
        onSetActiveTask(groupId)
    }

    async function onAddTask(ev) {
        // ev.preventDefault()
        try {
            setIsInputFocus(false)
            if (activeTask === groupId) onSetActiveTask(null)
            if (title) addTask()
        } catch (err) {
            console.error('Error changing task title:', err)
            showErrorMsg('Cannot add Task')
        }
    }

    return (
        <ul className="clean-list subgrid full-grid-column task-preview-container add-task">

            <ul className={`clean-list subgrid full-grid-column ${activeTask === groupId && 'active'} task-preview`}>

                <div className="subgrid full-grid-column task-title-container">
                    <div className="sticky-left flex subgrid full-width add-task-content">
                        <div className="add-task-content-layout flex">


                            <div className="task-row-placeholder"></div>
                            <div style={{ backgroundColor: groupColor }} className="color-display sticky-left-36"></div>

                            <div className="sticky-left-40 flex full-width">
                                <li className="task-selection">
                                    <input disabled type="checkbox" />
                                </li>

                                <li className="task-title single-task flex">
                                    <EditableTxt
                                        isEditing={isInputFocus}
                                        txtValue={'+ Add task'}
                                        onTxtClick={onTitleClick}
                                        inputValue={title}
                                        onInputChange={onSetTitle}
                                        onEditClose={onAddTask}
                                        placeholder={'+ Add task'}
                                    />
                                </li>
                            </div>
                        </div>
                    </div>
                    <li className="subgrid grid-column-table-content line-end"></li>
                </div>

            </ul>
        </ul>
    )
}
