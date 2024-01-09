import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../../customHooks/useEffectUpdate"

import { getMembersFromBoard, removeTask, updateTask } from "../../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal, setDynamicModalData, showErrorMsg, showSuccessMsg } from "../../../store/actions/system.actions"
import { fetchUsers } from "../../../store/actions/user.actions"

import { DeleteIcon, MenuIcon } from "../../../services/svg.service"
import { DynamicPicker } from "./Picker/DynamicPicker"

export function TaskPreview({ task, groupId, groupColor, onSetActiveTask, highlightText, filterBy }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const activeTask = useSelector((storeState) => storeState.boardModule.activeTask)
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const [currTask, setCurrTask] = useState(null)
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [isShowMenuBtn, setIsShowMenuBtn] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const isMenuOpen = fatherId === `${task.id}-menu`

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
                        memberOptions: board.members,
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
            setDynamicModal({ isOpen: true, boundingRect: ev.target.parentNode.getBoundingClientRect(), type: 'menuOptions', data: { options: menuOptions }, fatherId: `${currTask.id}-menu` })
        }
    }

    function onTitleClick() {
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

    if (!currTask) return <ul className="task-title">Loading</ul>
    return (
        <ul
            className="clean-list task-preview-container flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="menu-container sticky-left">
                {isShowMenuBtn && (
                    <button className="btn svg-inherit-color"
                        onClick={toggleMenu}><MenuIcon className="btn" />
                    </button>
                )}
            </div>

            <div
                style={{ backgroundColor: groupColor }}
                className="color-display sticky-left-36">
            </div>

            <ul className={` clean-list task-preview flex ${activeTask === currTask.id && 'active'}`}>
                <ul className={`clean-list task-title-container flex ${activeTask === currTask.id && 'active'}`}>
                    <li className="task-selection">
                        <input type="checkbox" />
                    </li>

                    <li className="task-title single-task flex">
                        {isEditing ? (
                            <form onSubmit={ev => (ev.preventDefault(), onTitleEditExit())}>
                                <input
                                    autoFocus
                                    value={taskTitle}
                                    onChange={onChangeTitle}
                                    className="reset focused-input"
                                    type="text"
                                    onBlur={onTitleEditExit}
                                />
                            </form>
                        ) : (
                            <span
                                className="editable-txt"
                                onClick={onTitleClick}
                                title={taskTitle}
                            >
                                {highlightText(taskTitle, filterBy.txt)}
                            </span>
                        )}
                    </li>

                </ul>

                {board.titlesOrder.map((title, idx) => {
                    return (
                        <DynamicPicker
                            key={idx}
                            title={title}
                            task={currTask}
                            onUpdate={onTaskChange}
                            memberOptions={board.members}
                        />
                    )
                })}

                <li className="line-end"></li>
            </ul>
        </ul>
    )
}
