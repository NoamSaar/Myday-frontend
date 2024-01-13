import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { AngleDownIcon, CollapseIcon, DeleteIcon, MenuIcon, PencilIcon } from "../../../services/svg.service"

import { getBoardColors, removeGroup, updateGroup } from "../../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal, showErrorMsg, showSuccessMsg } from "../../../store/actions/system.actions"

import { EditableTxt } from "../../EditableTxt"
import { TaskTable } from "./Task/TaskTable"
import { TaskHeaderList } from "./Task/TaskHeaderList"

export function BoardGroup({ group, titlesOrder, isEditingTitle, onTitleEditLeave, isGroupsCollapsed, isHeaderCollapsed, isMobile }) {
    const menuBtnRef = useRef(null)
    const colorBtnParentRef = useRef(null)

    const board = useSelector((storeState) => storeState.boardModule.filteredBoard)

    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)


    const [isEditing, setIsEditing] = useState(isEditingTitle)
    const [groupTitle, setGroupTitle] = useState(group.title)
    const [groupColor, setGroupColor] = useState(group.color)
    const [isGroupCollapsed, setIsGroupCollapsed] = useState(false)

    const isMenuOpen = parentId === `${group.id}-menu`
    const isColorPickerOpen = parentId === `${group.id}-colorPicker`
    const isMobileMenu = parentId === `${group.id}-mobile-menu`
    const colors = getBoardColors()


    useEffect(() => {
        setGroupTitle(group.title)
    }, [group])

    useEffect(() => {
        setIsEditing(isEditingTitle)
    }, [isEditingTitle])

    async function onGroupChange(field, data) {
        try {
            const updatedGroup = { ...group, [field]: data }
            // console.log('board from updateeeeee:', board)
            updateGroup(board._id, updatedGroup)
        } catch (err) {
            console.error('Error updating group:', err)
            showErrorMsg(`Cannot update Group ${groupTitle} ${field}`)
        }
    }

    async function onRemoveGroup() {
        try {
            removeGroup(board._id, group.id)
            resetDynamicModal()
            showSuccessMsg(`Group ${groupTitle} was successfully deleted.`)
        } catch (err) {
            console.error('Error removing task:', err)
            showErrorMsg(`Cannot delete Group ${groupTitle}`)
        }
    }

    async function onChangeTitle({ target }) {
        try {
            const title = target.value
            setGroupTitle(title)
        } catch (err) {
            console.error('Error changing group title:', err)
            showErrorMsg(`Cannot change Group ${groupTitle} Tile`)
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
            showErrorMsg(`Cannot change Group ${groupTitle} Color`)
        }
    }

    async function onGroupEditExit() {
        try {
            let titleToSave = groupTitle
            if (!groupTitle) {
                setGroupTitle(group.title)
                titleToSave = group.title
            }

            onGroupChange('title', titleToSave)

            if (!isColorPickerOpen) {
                setIsEditing(false)
                onTitleEditLeave()
            }
        } catch (err) {
            console.error('Error changing group title:', err)
            showErrorMsg(`Cannot change Group Tile`)
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
                parentRefCurrent: menuBtnRef.current,
                type: 'menuOptions', data: { options: menuOptions },
                parentId: `${group.id}-menu`
            })
        }
    }

    function toggleCollapsed() {
        resetDynamicModal()
        setIsGroupCollapsed(prevCollapsed => !prevCollapsed)
    }

    function onColorDisplayClick(ev) {
        ev.stopPropagation()

        if (isColorPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: colorBtnParentRef.current,
                type: 'colorPicker',
                data: { colors: colors, onColorClick: onChangeColor },
                parentId: `${group.id}-colorPicker`,
                isPosBlock: true,
            })
        }
    }

    function onTitleClick() {
        if (!isMobile) {
            setIsEditing(true)
        } else {

            if (isMobileMenu) {
                resetDynamicModal()
            } else {
                setDynamicModal(
                    {
                        isOpen: true,
                        parentRefCurrent: colorBtnParentRef.current,
                        type: 'menuOptions',
                        data: { options: menuOptions },
                        parentId: `${group.id}-mobile-menu`,
                        isPosBlock: true,
                        hasTooltip: true
                    })
            }
        }
    }

    function onEditClick() {
        resetDynamicModal()
        setIsEditing(true)
    }



    const menuOptions = [
        {
            icon: <DeleteIcon />,
            title: 'Delete',
            onOptionClick: onRemoveGroup
        }
    ]

    const extraTitleInputBtn = [
        {
            className: "group-color-display",
            style: { backgroundColor: groupColor },
            onMouseDown: onColorDisplayClick
        }

    ]

    if (isMobile) {
        menuOptions.push(
            {
                icon: <CollapseIcon />,
                title: 'Collapse',
                onOptionClick: toggleCollapsed
            },
            {
                icon: <PencilIcon />,
                title: 'Edit',
                onOptionClick: onEditClick
            }
        )
    }


    return (
        <section className={`${(isGroupCollapsed || isGroupsCollapsed) && 'collapsed'} board-group`}>
            <div className={`full-width subgrid full-grid-column ${isHeaderCollapsed && "board-header-collapsed"} group-sticky-container sticky-left`}>
                <div className="subgrid full-grid-column group-title-container sticky-left">
                    <div className="flex align-center sticky-left full-width">
                        {!isMobile && <div className={`menu-container flex align-center justify-center sticky-left ${isMenuOpen && 'full-opacity'}`} ref={menuBtnRef}>
                            <button className="btn svg-inherit-color" onClick={toggleMenu} style={{ fill: 'black' }}>
                                <MenuIcon />
                            </button>
                        </div>}

                        {(isGroupCollapsed || isGroupsCollapsed) && <div
                            style={{ backgroundColor: groupColor }}
                            className="color-display sticky-left-36">
                        </div>}

                        <div className={`${!isMobile && 'sticky-left-40'} title-container flex align-center`}>
                            <div className="flex align-center">

                                <button onClick={toggleCollapsed} title="Collapse group" style={{ fill: groupColor }} className="arrow-container flex svg-inherit-color">
                                    <AngleDownIcon />
                                </button>

                                <div ref={colorBtnParentRef}>
                                    <EditableTxt
                                        isEditing={isEditing}
                                        txtValue={highlightText(groupTitle, filterBy.txt)}
                                        onTxtClick={onTitleClick}
                                        inputValue={groupTitle}
                                        onInputChange={onChangeTitle}
                                        onEditClose={onGroupEditExit}
                                        style={{ color: groupColor }}
                                        extraBtns={extraTitleInputBtn}

                                    />
                                </div>
                            </div>


                            <p className="tasks-count">{group.tasks.length} Tasks</p>
                        </div>
                    </div>
                </div>
                <TaskHeaderList groupColor={groupColor} titlesOrder={titlesOrder} />
            </div>

            <TaskTable titlesOrder={titlesOrder} groupColor={groupColor} highlightText={highlightText} filterBy={filterBy} group={group} board={board} />

        </section >
    )
}
