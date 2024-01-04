import { useEffect, useState } from "react"
import { DynamicPicker } from "./DynamicPicker"
import { getUser } from "../store/actions/user.actions"
import { utilService } from "../services/util.service";
import { MenuOptionsModal } from "./MenuOptionsModal";
import { removeTask } from "../store/actions/board.actions";
import { useSelector } from "react-redux";

export function TaskPreview({ task, groupId }) {
    const [currTask, setCurrTask] = useState(null)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const board = useSelector((storeState) => storeState.boardModule.currBoard)

    useEffect(() => {
        const fetchData = async () => {
            let date = task.date

            try {
                const newPersons = task.person.length ?
                    await Promise.all(task.person.map(async person => {
                        const loadedUser = await getUser(person)
                        return loadedUser.imgUrl || loadedUser.fullname
                    }))
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
    }, [])

    async function onDeleteTask() {
        try {
            removeTask(board._id, groupId, currTask.id)
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    function handleMouseEnter() {
        setIsShowMenu(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenu(false)
    }

    function toggleMenu() {
        setIsMenuOpen(prevIsOpen => !prevIsOpen)
    }

    const menuOptions = [
        {
            icon: '../../../public/icons/delete.svg',
            title: 'Delete',
            onOptionClick: onDeleteTask
        }
    ]


    if (!currTask) return <ul>Loading</ul>
    return (
        <ul className="clean-list task-preview-container sticky-left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

            <div className="menu-container">
                {isMenuOpen && <MenuOptionsModal options={menuOptions} />}
                {isShowMenu && <img className="btn" src="../../../public/icons/menu.svg" onClick={toggleMenu} />}
            </div>
            <ul className="clean-list task-preview" key={currTask.id}>
                <div className="sticky-left task-title-container">
                    <li className="task-selection">
                        <input type="checkbox" />
                    </li>
                    <li className="task-title">{currTask.title}</li>
                </div>

                {board.titlesOrder.map((title, idx) => {
                    return <DynamicPicker key={idx} title={title} task={currTask} />
                })}

                <div className="line-end"></div>
            </ul>
        </ul>

    )
}

