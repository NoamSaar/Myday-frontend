import { useState } from "react";
import { TaskList } from "./TaskList";
import { useSelector } from "react-redux";
import { getGcolors, removeGroup, updateGroup } from "../../../store/actions/board.actions";
import { AngleDownIcon, DeleteIcon, MenuIcon } from "../../../services/svg.service";
import { ColorPickerModal } from "./Picker/PickerModals/ColorPickerModal";
import { setDynamicModal } from "../../../store/actions/system.actions";

export function BoardGroup({ group, titlesOrder }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
    const [groupTitle, setGroupTitle] = useState(group.title)
    const [groupColor, setGroupColor] = useState(group.color)
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const colors = getGcolors()


    function toggleMenu(ev) {
        if (isMenuOpen) {
            setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {} })
            setIsMenuOpen(false)
        } else {
            setDynamicModal({ isOpen: true, boundingRect: ev.target.getBoundingClientRect(), type: 'menu options', data: { options: menuOptions } })
            setIsMenuOpen(true)
        }
    }

    async function onGroupChange(field, date) {
        try {
            const updatedGroup = { ...group, [field]: date }
            updateGroup(board._id, updatedGroup)
        } catch (error) {
            console.error("Error changing group:", error)
        }
    }

    async function onDeleteGroup() {
        try {
            removeGroup(board._id, group.id)
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    async function onChangeTitle({ target }) {
        try {
            const title = target.value
            setGroupTitle(title)
            if (title) onGroupChange("title", title)
        } catch (error) {
            console.error("Error changing group title:", error)
        }
    }

    async function onChangeColor(color) {
        try {
            setGroupColor(color)
            onGroupChange("color", color)
            setIsColorPickerOpen(false)
            setIsEditing(false)
        } catch (error) {
            console.error("Error changing group color:", error)
            setGroupColor(group.color)
        }
    }

    async function onTitleEditExit() {
        try {

            if (!groupTitle) {
                setGroupTitle(group.title)
                onGroupChange("title", group.title)
            }

            if (!isColorPickerOpen) setIsEditing(false)
        } catch (error) {
            console.error("Error changing group title:", error)
        }
    }

    function highlightText(text, query) {
        if (!query) return text
        const parts = text.split(new RegExp(`(${query})`, 'gi'))
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase()
                ? <span key={index} className="highlight">{part}</span>
                : part
        )
    }


    function onColorDisplayClick(ev) {
        ev.stopPropagation()
        setIsColorPickerOpen(prevIsOpen => !prevIsOpen)
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

                <div className="group-title-container sticky-left">
                    <div className="menu-container sticky-left">
                        <button className="btn svg-inherit-color" onClick={toggleMenu} style={{ fill: 'black' }}><MenuIcon /></button>
                    </div>
                    <div className="sticky-left-40 title-container">
                        <button title="Collapse group" style={{ fill: groupColor }} className="arrow-container svg-inherit-color"><AngleDownIcon /></button>

                        {isEditing ? (
                            <div
                                tabIndex={0}
                                onBlur={onTitleEditExit}
                                className="focused-input group-title-edit-container"
                            >

                                <div className="group-color-display-container" >
                                    <div className="group-color-display" style={{ backgroundColor: groupColor }} onMouseDown={onColorDisplayClick}></div>
                                    {isColorPickerOpen && <ColorPickerModal colors={colors} onColorClick={onChangeColor} />}
                                </div>

                                <form onSubmit={ev => (ev.preventDefault(), onTitleEditExit())}>
                                    <input
                                        className="reset"
                                        style={{ color: groupColor }}
                                        type="text"
                                        autoFocus
                                        value={groupTitle}
                                        onChange={onChangeTitle}
                                        onBlur={onTitleEditExit}
                                    />
                                </form>
                            </div>
                        ) : (
                            // <h4 style={{ color: group.color }} className="editable-txt" onClick={() => setIsEditing(true)}>{highlightText(groupTitle, filterBy.txt)}</h4>
                            // <h4 style={{ color: groupColor }} className="editable-txt" onClick={() => setIsEditing(true)}>{groupTitle}</h4>
                            <h4 style={{ color: groupColor }} className="editable-txt" onClick={() => setIsEditing(true)}>{highlightText(groupTitle, filterBy.txt)}</h4>
                        )}
                        <p className="tasks-count">{group.tasks.length} Tasks</p>
                    </div>
                </div>

                <div className="task-header-list-container sticky-left">
                    <div className="task-row-placeholder sticky-left"></div>
                    <ul className="clean-list task-header-list sticky-left-36">
                        <div style={{ backgroundColor: groupColor }} className="color-display sticky-left-36"></div>

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

            </div>

            <TaskList titlesOrder={titlesOrder}
                groupId={group.id}
                highlightText={highlightText}
                filterBy={filterBy}
                groupColor={groupColor} />
        </section >
    )
}
