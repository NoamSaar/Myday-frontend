import { useRef, useState } from "react"
import { utilService } from "../../services/util.service"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"

export function SidebarFilter({ filterBy, onSetFilter, onToggleIsFocus, isFocus, onAddNewBoard }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

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
                <div className={`search-section flex aligh-center ${isFocus ? 'active' : ''}`}
                    onClick={onToggleIsFocus}>
                    <div className="btn search-icon">
                        <img src="../../public/icons/Search.svg" alt="search-icon" />
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
                <img src="../../public/icons/AddSmall.svg" alt="add-icon" />
            </button>
        </>
    )
}