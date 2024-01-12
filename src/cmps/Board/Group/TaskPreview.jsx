import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../../customHooks/useEffectUpdate"

import { getMembersFromBoard, removeTask, updateTask } from "../../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal, setDynamicModalData, setSidePanelOpen, showErrorMsg, showSuccessMsg } from "../../../store/actions/system.actions"

import { DeleteIcon, MenuIcon, OpenIcon } from "../../../services/svg.service"
import { DynamicPreview } from "./Picker/DynamicPreview"
import { EditableTxt } from "../../EditableTxt"
import { useNavigate } from "react-router"

export function TaskPreview({ task, groupId, groupColor, onSetActiveTask, highlightText, filterBy }) {
    const menuBtnRef = useRef(null)
    const navigate = useNavigate()

    const board = useSelector((storeState) => storeState.boardModule.filteredBoard)
    const activeTask = useSelector((storeState) => storeState.boardModule.activeTask)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const [currTask, setCurrTask] = useState(null)
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [isShowMenuBtn, setIsShowMenuBtn] = useState(false)
    const [isShowTaskDetailsBtn, setIsShowTaskDetailsBtn] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const isMenuOpen = parentId === `${task.id}-menu`
    const isActive = currTask ? activeTask === currTask.id : false

    useEffect(() => {
        const newmembers = task.members.length
            ? getMembersFromBoard(board, task.members)
            : []

        setCurrTask({ ...task, members: newmembers })
        setTaskTitle(task.title)
    }, [task])

    useEffectUpdate(() => {
        setCurrTask((prevTask) => ({ ...prevTask, title: taskTitle }))
    }, [taskTitle])

    async function onTaskChange(field, recivedData) {
        try {
            let data = recivedData
            if (field === 'members') data = data.map(member => member._id)

            const updatedTask = { ...task, members: task.members, [field]: data }
            updateTask(board._id, groupId, updatedTask)

            switch (field) {
                case 'members':
                    setDynamicModalData({
                        chosenMembers: recivedData,
                        allMembers: board.members,
                        onChangeMembers: onTaskChange
                    })
                    break
                default:
                    break
            }
        } catch (err) {
            console.error('Error changing task:', err)
            showErrorMsg('Cannot change Task')
        }
    }

    async function onRemoveTask() {
        try {
            removeTask(board._id, groupId, task.id)
            resetDynamicModal()
            showSuccessMsg('We successfully deleted the Task')
        } catch (err) {
            console.error('Error removing task:', err)
            showErrorMsg('Cannot remove Task')
        }
    }

    async function onChangeTitle({ target }) {
        try {
            const title = target.value
            setTaskTitle(title)
        } catch (err) {
            console.error('Error changing task title:', err)
            showErrorMsg('Cannot changing Task Title')
        }
    }

    function handleMouseEnter() {
        setIsShowMenuBtn(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenuBtn(false)
    }

    function toggleMenu(ev) {
        if (isMenuOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal(
                {
                    isOpen: true,
                    parentRefCurrent: menuBtnRef.current,
                    type: 'menuOptions',
                    data: { options: menuOptions },
                    parentId: `${currTask.id}-menu`
                })
        }
    }

    function onTitleClick(ev) {
        ev.stopPropagation()
        setIsEditing(true)
        onSetActiveTask(task.id)
    }

    async function onTitleEditExit() {
        try {
            if (activeTask === task.id) onSetActiveTask(null)

            let titleToSave = taskTitle
            if (!taskTitle) {
                setTaskTitle(task.title)
                titleToSave = task.title
            }

            onTaskChange('title', titleToSave)

            setIsEditing(false)
        } catch (err) {
            console.error('Error changing task title:', err)
            showErrorMsg('Cannot changing Task Title')
        }
    }


    const menuOptions = [
        {
            icon: <DeleteIcon />,
            title: 'Delete',
            onOptionClick: onRemoveTask,
        },
    ]

    if (!currTask) return <ul className="task-preview-container task-title">Loading</ul>
    return (
        <ul
            className="clean-list flex subgrid full-grid-column task-preview-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`${isActive && 'active'} task-sticky-container sticky-left`}>
                <div className="menu-container">
                    {isShowMenuBtn && (
                        <button
                            ref={menuBtnRef}
                            className="btn svg-inherit-color"
                            onClick={toggleMenu}><MenuIcon className="btn" />
                        </button>
                    )}
                </div>

                <div
                    style={{ backgroundColor: groupColor }}
                    className="color-display sticky-left-36">
                </div>
                <ul className={`clean-list task-title-container flex ${isActive && 'active'}`}>
                    <li className="task-selection">
                        <input type="checkbox" />
                    </li>

                    <li className="task-title single-task flex"
                        onClick={() => {
                            setSidePanelOpen(true)
                            navigate('task/' + currTask.id)
                        }}

                        onMouseEnter={() => setIsShowTaskDetailsBtn(true)}
                        onMouseLeave={() => setIsShowTaskDetailsBtn(false)}
                    >

                        <EditableTxt
                            isEditing={isEditing}
                            txtValue={highlightText(taskTitle, filterBy.txt)}
                            onTxtClick={onTitleClick}
                            inputValue={taskTitle}
                            onInputChange={onChangeTitle}
                            onEditClose={onTitleEditExit}
                        />

                        <div className="open-details-container">
                            {(isShowTaskDetailsBtn && !isEditing) && <div className="task-details-btn flex justify-center">
                                <OpenIcon />
                                <p>Open</p>
                            </div>}
                        </div>

                    </li>


                </ul>
            </div>

            <ul className={`clean-list subgrid grid-column-table-content flex ${isActive && 'active'} task-preview`}>

                {board.titlesOrder.map((title, idx) => {
                    return (
                        <DynamicPreview
                            key={idx}
                            title={title}
                            task={currTask}
                            onUpdate={onTaskChange}
                            allMembers={board.members}
                        />
                    )
                })}

                <li className="line-end"></li>
            </ul>
        </ul>
    )
}
