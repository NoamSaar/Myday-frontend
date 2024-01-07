import { useEffect, useRef, useState } from "react"
import { DynamicPicker } from "./Picker/DynamicPicker"
import { getUser } from "../../../store/actions/user.actions"
import { utilService } from "../../../services/util.service"
import { MenuOptionsModal } from "../../MenuOptionsModal"
import { removeTask, updateTask } from "../../../store/actions/board.actions"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { DeleteIcon, MenuIcon } from "../../../services/svg.service"
import { setDynamicModal, setDynamicModalBoundingRect, setDynamicModalData, setDynamicModalOpen, setDynamicModalType } from "../../../store/actions/system.actions"

export function TaskPreview({ task, groupId, groupColor, onSetActiveTask, highlightText, filterBy }) {
    const [currTask, setCurrTask] = useState(null)
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [isShowMenu, setIsShowMenu] = useState(false)
    // const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isMenuOpen = fatherId === `${task.id}-menu`
    const activeTask = useSelector((storeState) => storeState.boardModule.activeTask)

    useEffect(() => {
        const fetchData = async () => {
            let date = task.date

            try {
                const newPersons = task.person.length
                    ? await Promise.all(
                        task.person.map(async (person) => {
                            const loadedUser = await getUser(person)
                            return loadedUser.imgUrl || loadedUser.fullname
                        })
                    )
                    : []

                if (task.date) {
                    date = utilService.getFormatDate(task.date)
                }

                setCurrTask({ ...task, person: newPersons, date })
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


    async function onTaskChange(field, date) {
        try {
            const updatedTask = { ...task, person: task.person, [field]: date }
            updateTask(board._id, groupId, updatedTask)
        } catch (error) {
            console.error("Error changing task:", error)
        }
    }

    async function onDeleteTask() {
        try {
            removeTask(board._id, groupId, task.id)
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    async function onChangeTitle({ target }) {
        try {
            const title = target.value
            setTaskTitle(title)
            if (title) onTaskChange("title", title)
        } catch (error) {
            console.error("Error changing task title:", error)
        }
    }

    function handleMouseEnter() {
        setIsShowMenu(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenu(false)
        // if (!isMenuOpen) setIsShowMenu(false)
    }

    function toggleMenu(ev) {
        if (isMenuOpen) {

            //updating modal in store
            setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {}, fatherId: '' })

            // setIsMenuOpen(false)
        } else {

            //updating modal in store
            setDynamicModal({ isOpen: true, boundingRect: ev.target.getBoundingClientRect(), type: 'menu options', data: { options: menuOptions }, fatherId: `${currTask.id}-menu` })

            // setIsMenuOpen(true)

        }
        // console.log('ev.getBoundingClientRect()', ev.target.getBoundingClientRect())
    }

    function onTitleClick() {
        setIsEditing(true)
        console.log('task.id', task.id)
        onSetActiveTask(task.id)
    }

    async function onTitleEditExit() {
        try {
            if (activeTask === task.id) onSetActiveTask(null)

            if (!taskTitle) {
                setTaskTitle(task.title)
                onTaskChange("title", task.title)
            }
            setIsEditing(false)
        } catch (error) {
            console.error("Error changing task title:", error)
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
            className="clean-list task-preview-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="menu-container sticky-left">
                {isShowMenu && (<button className="btn svg-inherit-color" onClick={toggleMenu}><MenuIcon className="btn" /></button>)}
            </div>
            <div
                style={{ backgroundColor: groupColor }}
                className="color-display sticky-left-36"
            ></div>
            <ul className={`${activeTask === currTask.id && 'active'} clean-list task-preview`}>
                <div className={`task-title-container ${activeTask === currTask.id && 'active'}`}>
                    <li className="task-selection">
                        <input type="checkbox" />
                    </li>
                    <li className="task-title single-task">

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
                            <span className="editable-txt" onClick={onTitleClick}>{highlightText(taskTitle, filterBy.txt)}</span>
                            // <span className="editable-txt" onClick={onTitleClick}>{taskTitle}</span>

                        )}
                    </li>

                </div>

                {board.titlesOrder.map((title, idx) => {
                    return <DynamicPicker key={idx} title={title} task={currTask} />
                })}

                <li className="line-end"></li>
            </ul>
        </ul>
    )
}
