import { useRef, useState } from "react"

import { utilService } from "../../services/util.service"

import { DynamicInput } from "../DynamicInput"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { PlusIcon, SearchIcon } from "../../services/svg.service"

export function SidebarFilter({ filterBy, onSetFilter, onAddNewBoard }) {
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
        //         icon: < SearchIcon />,
        //         func: console.log('hi'),
        //     }
        // ]
    }

    return (
        <>
            <div className="sidebar-filter grid column place-center">
                <DynamicInput inputProps={inputProps} />
            </div>
            <button className="btn clrblue" title="Add Item to Workspace"
                onClick={onAddNewBoard}>
                <PlusIcon />
            </button>
        </>
    )
}