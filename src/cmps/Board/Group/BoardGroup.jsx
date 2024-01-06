import { useState } from "react";
import { TaskList } from "./TaskList";
import { useSelector } from "react-redux";
import { MenuOptionsModal } from "../../MenuOptionsModal";
import { removeGroup } from "../../../store/actions/board.actions";
import { AngleDownIcon, DeleteIcon, MenuIcon } from "../../../services/svg.service";

export function BoardGroup({ group, titlesOrder }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const board = useSelector((storeState) => storeState.boardModule.currBoard)


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
            icon: <DeleteIcon />,
            title: 'Delete',
            onOptionClick: onDeleteGroup
        }
    ]


    return (
        <section className='board-group'>
            <div className="group-sticky-container sticky-left">

                <div className="board-title-container sticky-left">
                    <div className="menu-container sticky-left">
                        {isMenuOpen && <MenuOptionsModal options={menuOptions} pos={'top'} />}
                        <button className="btn" onClick={toggleMenu} style={{ fill: 'black' }}><MenuIcon /></button>
                    </div>
                    <div className="sticky-left-40 title-container">
                        <button style={{ fill: group.color }} className="arrow-container"><AngleDownIcon /></button>
                        <h4 style={{ color: group.color }}>{group.title}</h4>
                        <p className="tasks-count">{group.tasks.length} Tasks</p>
                    </div>
                </div>

                <ul className="clean-list task-header-list">
                    <div style={{ backgroundColor: group.color }} className="color-display sticky-left-36"></div>

                    <div className="task-title-container">

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
        </section >
    )
}
