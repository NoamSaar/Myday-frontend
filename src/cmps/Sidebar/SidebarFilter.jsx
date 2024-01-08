import { useRef, useState } from "react"

import { utilService } from "../../services/util.service"

import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { PlusIcon, SearchIcon } from "../../services/svg.service"

export function SidebarFilter({ filterBy, onSetFilter, onToggleIsFocus, isFocus, onAddNewBoard }) {
    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <>
            <div className="sidebar-filter grid column place-center">
                <div className={`search-section flex align-center ${isFocus ? 'focus' : ''}`}
                    onClick={onToggleIsFocus}>
                    <div className="btn search-icon">
                        <SearchIcon />
                    </div>
                    <input
                        type="search"
                        placeholder="Search"
                        name="title"
                        onBlur={onToggleIsFocus}
                        onChange={handleChange}
                    />
                </div>

            </div>
            <button className="btn clrblue" title="Add Item to Workspace"
                onClick={onAddNewBoard}>
                {/* <PlusIcon /> */}
                <img src="../../public/icons/AddSmall.svg" alt="add-icon" />
            </button>
        </>
    )
}