import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../../customHooks/useEffectUpdate"

import { removeTask, updateTask } from "../../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal, setDynamicModalData } from "../../../store/actions/system.actions"
import { fetchUsers } from "../../../store/actions/user.actions"

import { DeleteIcon, MenuIcon } from "../../../services/svg.service"
import { DynamicPicker } from "./Picker/DynamicPicker"

export function TaskPreview({ task, groupId, groupColor, onSetActiveTask, highlightText, filterBy }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const activeTask = useSelector((storeState) => storeState.boardModule.activeTask)
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const [currTask, setCurrTask] = useState(null)
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const isMenuOpen = fatherId === `${task.id}-menu`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newPersons = task.person.length
                    ? await fetchUsers(task.person)
                    : []

                setCurrTask({ ...task, person: newPersons })
                setTaskTitle(task.title)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
    }, [task])

    useEffectUpdate(() => {
        setCurrTask((prevTask) => ({ ...prevTask, title: taskTitle }))
    }, [taskTitle])

    async function onTaskChange(field, data) {
        try {
            let recivedData = data
            if (field === 'person') recivedData = data.map(person => person._id)

            const updatedTask = { ...task, person: task.person, [field]: recivedData }
            updateTask(board._id, groupId, updatedTask)

            switch (field) {
                case 'person':
                    setDynamicModalData({
                        chosenMembers: data,
                        memberOptions: board.members,
                        onChangeMembers: onTaskChange
                    })
                    break
                default:
                    break
            }
        } catch (error) {
            console.error("Error changing task:", error)
        }
    }

    async function onDeleteTask() {
        try {
            removeTask(board._id, groupId, task.id)
            resetDynamicModal()
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    async function onChangeTitle({ target }) {
        try {
            const title = target.value
            setTaskTitle(title)
        } catch (error) {
            console.error("Error changing task title:", error)
        }
    }

    function handleMouseEnter() {
        setIsShowMenu(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenu(false)
    }

    function toggleMenu(ev) {
        if (isMenuOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({ isOpen: true, boundingRect: ev.target.parentNode.getBoundingClientRect(), type: 'menu options', data: { options: menuOptions }, fatherId: `${currTask.id}-menu` })
        }
    }

    function onTitleClick() {
        setIsEditing(true)
        onSetActiveTask(task.id)
    }

    async function onTitleEditExit() {
        try {
            if (activeTask === task.id) onSetActiveTask(null)

            if (!taskTitle) {
                setTaskTitle(task.title)
                onTaskChange("title", task.title)
            } else {
                onTaskChange("title", taskTitle)
            }

            setIsEditing(false)
        } catch (error) {
            console.error("Error changing task title:", error)
        }
    }

    function handleMouseEnter() {
        setIsShowMenu(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenu(false)
    }

    function toggleMenu(ev) {
        if (isMenuOpen) {
            setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {}, fatherId: '' })
        } else {
            setDynamicModal({ isOpen: true, boundingRect: ev.target.parentNode.getBoundingClientRect(), type: 'menu options', data: { options: menuOptions }, fatherId: `${currTask.id}-menu` })
        }
    }

    const menuOptions = [
        {
            icon: <DeleteIcon />,
            title: "Delete",
            onOptionClick: onDeleteTask,
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
                {isShowMenu && (
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
                <div className={`task-title-container flex ${activeTask === currTask.id && 'active'}`}>
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

                </div>

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
