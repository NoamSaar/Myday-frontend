import { useEffect, useRef, useState } from "react"
import { DynamicPicker } from "./Picker/DynamicPicker"
import { getUser } from "../../../store/actions/user.actions"
import { utilService } from "../../../services/util.service"
import { MenuOptionsModal } from "../../MenuOptionsModal"
import { removeTask, updateTask } from "../../../store/actions/board.actions"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"

export function TaskPreview({ task, groupId, groupColor }) {
    const [currTask, setCurrTask] = useState(null)
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const board = useSelector((storeState) => storeState.boardModule.currBoard)

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

    function onChangeTitle({ target }) {
        const title = target.value
        setTaskTitle(title)
        if (title) onTaskChange("title", title)
    }

    function handleMouseEnter() {
        setIsShowMenu(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenu(false)
    }

    function toggleMenu() {
        setIsMenuOpen((prevIsOpen) => !prevIsOpen)
    }

    function onTitleClick() {
        setIsEditing(true)
    }

    function onTitleEditExit() {
        setIsEditing(false)
    }

    const menuOptions = [
        {
            icon: "../../../public/icons/delete.svg",
            title: "Delete",
            onOptionClick: onDeleteTask,
        },
    ]


    if (!currTask) return <ul>Loading</ul>
    return (
        <ul
            className="clean-list task-preview-container sticky-left-36"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="menu-container sticky-left">
                {isMenuOpen && <MenuOptionsModal options={menuOptions} />}
                {isShowMenu && (
                    <img
                        className="btn"
                        src="../../../public/icons/menu.svg"
                        onClick={toggleMenu}
                    />
                )}
            </div>
            <div
                style={{ backgroundColor: groupColor }}
                className="color-display sticky-left-36"
            ></div>
            <ul className={`${isActive && 'active'} clean-list task-preview`}>
                <div className={`task-title-container ${isActive && 'active'}`}>
                    <li className="task-selection">
                        <input type="checkbox" />
                    </li>
                    <li className="task-title single-task">

                        {isEditing ? (
                            <input
                                autoFocus
                                value={taskTitle}
                                onChange={onChangeTitle}
                                className="reset"
                                type="text"
                                onBlur={onTitleEditExit}
                            />
                        ) : (
                            <span onClick={onTitleClick}>{taskTitle}</span>

                        )}
                    </li>



                    {/* {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(ev) => setEditedTitle(ev.target.value)}
                        onBlur={onRenameBoard}
                        autoFocus
                    />
                ) : (
                    <>
                        <span>{board.title}</span>
                        <img
                            className="btn btn-option-menu"
                            src="../../public/icons/menu.svg"
                            alt="Board Menu"
                            onClick={onOpenModal}
                        />
                    </>
                )} */}
                </div>

                {board.titlesOrder.map((title, idx) => {
                    return <DynamicPicker key={idx} title={title} task={currTask} />
                })}

                <div className="line-end"></div>
            </ul>
        </ul>
    )
}
