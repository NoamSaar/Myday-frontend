import { useState } from "react";
import { TaskList } from "./TaskList";
import { MenuOptionsModal } from "../../MenuOptionsModal";

export function BoardGroup({ group, titlesOrder }) {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleMouseEnter() {
        setIsShowMenu(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenu(false)
    }

    function toggleMenu() {
        setIsMenuOpen(prevIsOpen => !prevIsOpen)
    }


    return (
        <section className='board-group'>
            <div className="group-sticky-container sticky-left">

                <div className="board-title-container sticky-left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="menu-container sticky-left">
                        {isMenuOpen && <MenuOptionsModal options={menuOptions} />}
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
