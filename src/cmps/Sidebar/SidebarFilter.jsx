import { useRef, useState } from "react"
import { useSelector } from "react-redux"

import { utilService } from "../../services/util.service"

import { DynamicInput } from "../DynamicInput"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { PlusIcon, FilterIcon } from "../../services/svg.service"
import { resetDynamicModal, setDynamicModal } from "../../store/actions/system.actions"

export function SidebarFilter({ filterBy, onSetFilter, onAddNewBoard }) {
    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const { parentId, type, isOpen } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isModalOpen = parentId === `add-board-tooltip`
    const titleRef = useRef(null)

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onStatEnter(txt, name) {
        if (isOpen && type !== 'tooltip') return

        setDynamicModal(
            {
                isOpen: true,
                parentRefCurrent: titleRef.current,
                type: 'tooltip',
                data: { txt },
                parentId: `${name}-tooltip`,
                hasCaret: true,
                isCenter: true,
                isPosBlock: true,
                caretClred: true

            })
    }

    function onStatLeave() {
        if (isModalOpen) resetDynamicModal()
    }

    const inputProps = {
        name: 'title',
        inputValue: filterByToEdit.title,
        placeholder: 'Search',
        type: 'search',
        handleChange: handleChange,
        isSearchInput: true,
        isResetBtn: true,
        // additionalBtns: [
        //     {
        //         name: 'filter',
        //         icon: < FilterIcon />,
        //         func: console.log('hi'),
        //     }
        // ]
    }

    return (
        <>
            <div className="sidebar-filter grid column place-center">
                <DynamicInput inputProps={inputProps} />
            </div>
            <button
                className="btn clrblue"
                // title="Add Item to Workspace"
                onClick={onAddNewBoard}
                ref={titleRef}
                onMouseEnter={() => onStatEnter('Add Item to workspace', 'add-board')}
                onMouseLeave={onStatLeave}
            >
                <PlusIcon />
            </button>
        </>
    )
}