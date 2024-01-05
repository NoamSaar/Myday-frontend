import { useState } from "react";
import { TaskList } from "./TaskList";
import { useSelector } from "react-redux";
import { MenuOptionsModal } from "../../MenuOptionsModal";
import { removeGroup } from "../../../store/actions/board.actions";

export function BoardGroup({ group, titlesOrder }) {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const board = useSelector((storeState) => storeState.boardModule.currBoard)

    function handleMouseEnter() {
        setIsShowMenu(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenu(false)
    }

    function toggleMenu() {
        setIsMenuOpen(prevIsOpen => !prevIsOpen)
    }

    async function onDeleteGroup() {
        try {
            removeGroup(board._id, group.id)
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    const menuOptions = [
        {
            icon: '../../../public/icons/delete.svg',
            title: 'Delete',
            onOptionClick: onDeleteGroup
        }
    ]


    return (
        <section className='board-group'>
            <div className="group-sticky-container sticky-left">

                <div className="board-title-container sticky-left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="menu-container sticky-left">
                        {isMenuOpen && <MenuOptionsModal options={menuOptions} pos={'top'} />}
                        <img className="btn" src="../../../public/icons/menu.svg" onClick={toggleMenu} />
                    </div>
                    <div className="sticky-left-36 title-container">
                        <img className="down-arrow" src="../../../public/icons/NavigationChevronDown.svg" title="Collapse group" />
                        <h4 >{group.title}</h4>
                        <p>{group.tasks.length} Tasks</p>
                    </div>
                </div>

                <ul className="clean-list task-header-list">
                    <div className="sticky-left-36 task-title-container">

                        <li className="task-selection">
                            <input type="checkbox" />
                        </li>

                        <li className="task-title">Task</li>
                    </div>

                    {board.titlesOrder.map((title, idx) => {
                        return <li key={idx} className={`${title.toLowerCase()}-col`}>
                            {title}
                        </li>
                    })}
                    <li className="line-end"></li>
                </ul>

            </div>

            <TaskList titlesOrder={titlesOrder} groupId={group.id} />
        </section>
    )
}
