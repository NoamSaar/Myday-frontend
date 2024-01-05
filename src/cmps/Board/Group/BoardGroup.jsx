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
            <div className="board-title-container sticky-left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="menu-container">
                    {isMenuOpen && <MenuOptionsModal options={menuOptions} />}
                    <img className="btn" src="../../../public/icons/menu.svg" onClick={toggleMenu} />
                </div>
                <img className="down-arrow" src="../../../public/icons/NavigationChevronDown.svg" title="Collapse group" />
                <h4 >{group.title}</h4>
                <p>{group.tasks.length} Tasks</p>
            </div>
            <TaskList titlesOrder={titlesOrder} groupId={group.id} />
        </section>
    )
}
