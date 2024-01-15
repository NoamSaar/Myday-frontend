import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { addTask, getMemberFromBoard } from "../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal, setDynamicModalData, showErrorMsg } from "../../store/actions/system.actions"

import { CloseFilledIcon, FilterIcon, HideIcon, PersonIcon, PlusIcon, SearchIcon, SettingsKnobsIcon, SortIcon } from "../../services/svg.service"
import { UserImg } from "../UserImg"
import { DynamicInput } from "../DynamicInput"

export function BoardFilter({ board, filterBy, onSetFilter }) {
    const filterSearchRef = useRef(null)
    const personBtnRef = useRef(null)

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isFocused, setIsFocused] = useState(false)

    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isMemberPickerOpen = parentId === `${board._id}-memberFilterPicker`

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideSearch)

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSearch)
        }
    }, [filterByToEdit.txt])

    useEffect(() => {
        onSetFilter(filterByToEdit)

    }, [filterByToEdit])

    function handleClickOutsideSearch(event) {
        if (filterSearchRef.current
            && !filterSearchRef.current.contains(event.target)) {
            if (filterByToEdit.txt === '') {
                setIsFocused(false)
            }
        }
    }

    async function onAddTask() {
        try {
            const taskTitle = 'New Item'
            await addTask(board._id, board.groups[0].id, taskTitle, true)
        } catch (err) {
            console.error('Error adding new task:', err)
            showErrorMsg('Cannot update Board')
        }
    }

    function toggleMemberFilter(ev) {
        ev.stopPropagation()
        if (isMemberPickerOpen) { //check if curr modal picker is open
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: personBtnRef.current,
                parentId: `${board._id}-memberFilterPicker`,
                type: 'boardMemberSelect',
                data: { chosenMember: filterByToEdit.member, onChangeMember: setMemberFilter, members: board.members },
                isPosBlock: true,
                isCenter: true
            })
        }
    }

    function setMemberFilter(memberId) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, member: memberId }))

        setDynamicModalData({
            chosenMember: memberId,
            onChangeMember: setMemberFilter,
            members: board.members,
        })
    }

    function onResetMemberFilter(ev) {
        ev.stopPropagation()
        setMemberFilter(null)
        resetDynamicModal()
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const dynActiveClass = filterByToEdit.txt ? 'active' : ''
    const { txt } = filterByToEdit

    const inputProps = {
        name: 'txt',
        inputValue: txt,
        placeholder: 'Search',
        type: 'search',
        handleChange: handleChange,
        isSearchInput: true,
        isAutoFocus: true,
        isResetBtn: true,
        additionalBtns: [
            {
                name: 'filter',
                icon: <SettingsKnobsIcon />,
                func: () => { },
            }
        ]
    }

    return (
        <div className="board-filter">

            <button title="New task" className="btn new-task" onClick={onAddTask}>
                <PlusIcon />
                <span>New Task</span>
            </button>

            <div className={dynActiveClass + ' search'} ref={filterSearchRef}>
                {!isFocused ?
                    <div className="btn" onClick={() => setIsFocused(true)}>
                        <SearchIcon />
                        <span>Search</span>
                    </div>
                    :
                    <DynamicInput inputProps={inputProps} />}
            </div>


            <button className={` btn ${filterByToEdit.member || isMemberPickerOpen ? 'active' : ''} person`} title="Filter by person" onClick={toggleMemberFilter} ref={personBtnRef}>
                {filterByToEdit.member ? <UserImg user={getMemberFromBoard(board, filterByToEdit.member)} /> : <PersonIcon />}
                <span>Person</span>
                {filterByToEdit.member && <div className="close-btn svg-inherit-color"
                    style={{ fill: '#323338' }}
                    onClick={onResetMemberFilter}
                >
                    <CloseFilledIcon />
                </div>}
            </button>

            <button className="btn filter" title="Filter by anything">
                <FilterIcon />
                <span>Filter</span>
            </button>

            <button className="btn sort" title="Sort by column">
                <SortIcon />
                <span>Sort</span>
            </button>

            <button className="btn hide" title="Hidden columns">
                <HideIcon />
                <span>Hide</span>
            </button>

        </div>
    )
}
