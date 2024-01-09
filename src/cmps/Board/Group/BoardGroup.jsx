import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { AngleDownIcon, DeleteIcon, MenuIcon } from "../../../services/svg.service"
import { utilService } from "../../../services/util.service"

import { getGcolors, removeGroup, updateGroup } from "../../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal } from "../../../store/actions/system.actions"

import { TaskList } from "./TaskList"
import { GroupTitlesList } from "./GroupTitlesList"
import { TaskHeaderList } from "./TaskHeaderList"

export function BoardGroup({ group, titlesOrder, isEditingTitle, onTitleEditLeave }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const isHeaderCollapsed = useSelector((storeState) => storeState.boardModule.isHeaderCollapsed)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const [isEditing, setIsEditing] = useState(isEditingTitle)
    const [groupTitle, setGroupTitle] = useState(group.title)
    const [groupColor, setGroupColor] = useState(group.color)

    const isMenuOpen = fatherId === `${group.id}-menu`
    const isColorPickerOpen = fatherId === `${group.id}-colorPicker`
    const colors = getGcolors()

    useEffect(() => {
        setGroupTitle(group.title)
    }, [group])

    useEffect(() => {
        setIsEditing(isEditingTitle)
    }, [isEditingTitle])

    async function onGroupChange(field, date) {
        try {
            const updatedGroup = { ...group, [field]: date }
            updateGroup(board._id, updatedGroup)
        } catch (err) {
            console.error('Error changing group:', err)
        }
    }

    async function onDeleteGroup() {
        try {
            removeGroup(board._id, group.id)
            resetDynamicModal()
        } catch (err) {
            console.error('Error removing task:', err)
        }
    }

    async function onChangeTitle({ target }) {
        try {
            const title = target.value
            setGroupTitle(title)
        } catch (err) {
            console.error('Error changing group title:', err)
        }
    }

    async function onChangeColor(color) {
        try {
            setGroupColor(color)
            onGroupChange('color', color)
            resetDynamicModal()
            setIsEditing(false)
        } catch (err) {
            console.error('Error changing group color:', err)
            setGroupColor(group.color)
        }
    }

    async function onTitleEditExit() {
        try {
            if (!groupTitle) {
                setGroupTitle(group.title)
                onGroupChange('title', group.title)
            } else {
                onGroupChange('title', groupTitle)
            }

            if (!isColorPickerOpen) {
                setIsEditing(false)
                onTitleEditLeave()
            }
        } catch (err) {
            console.error('Error changing group title:', err)
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

    function toggleMenu(ev) {
        if (isMenuOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                boundingRect: ev.target.getBoundingClientRect(),
                type: 'menuOptions', data: { options: menuOptions },
                fatherId: `${group.id}-menu`
            })
        }
    }

    function onColorDisplayClick(ev) {
        ev.stopPropagation()

        if (isColorPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                boundingRect: ev.target.getBoundingClientRect(),
                type: 'colorPicker',
                data: { colors: colors, onColorClick: onChangeColor },
                fatherId: `${group.id}-colorPicker`
            })
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
        <section className="board-group flex column">
            <div className={`${isHeaderCollapsed && "board-header-collapsed"} group-sticky-container sticky-left`}>

                <div className="group-title-container flex align-center sticky-left">
                    <div className={`menu-container sticky-left ${isMenuOpen && 'full-opacity'}`}>
                        <button className="btn svg-inherit-color" onClick={toggleMenu} style={{ fill: 'black' }}>
                            <MenuIcon />
                        </button>
                    </div>
                    <div className="sticky-left-40 title-container flex align-center">
                        <button title="Collapse group" style={{ fill: groupColor }} className="arrow-container flex svg-inherit-color"><AngleDownIcon /></button>

                        {isEditing ? (
                            <div
                                tabIndex={0}
                                onBlur={onTitleEditExit}
                                className="focused-input group-title-edit-container flex align-center"
                            >
                                <div
                                    className="group-color-display"
                                    style={{ backgroundColor: groupColor }}
                                    onMouseDown={onColorDisplayClick}>
                                </div>

                                <form onSubmit={ev => (ev.preventDefault(), onTitleEditExit())}>
                                    <input
                                        className="reset"
                                        type="text"
                                        autoFocus
                                        style={{ color: groupColor }}
                                        value={groupTitle}
                                        onChange={onChangeTitle}
                                        onBlur={onTitleEditExit}
                                    />
                                </form>
                            </div>
                        ) : (
                            <h4 style={{ color: groupColor }} className="editable-txt"
                                onClick={() => setIsEditing(true)}
                            >
                                {highlightText(groupTitle, filterBy.txt)}
                            </h4>
                        )}
                        <p className="tasks-count">{group.tasks.length} Tasks</p>
                    </div>
                </div>

                <TaskHeaderList groupColor={groupColor} titlesOrder={board.titlesOrder} />
            </div>

            <TaskList titlesOrder={titlesOrder}
                groupId={group.id}
                highlightText={highlightText}
                filterBy={filterBy}
                groupColor={groupColor} />
        </section >
    )
}
