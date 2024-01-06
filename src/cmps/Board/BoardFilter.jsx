import { useEffect, useRef, useState } from "react"
import { FilterIcon, HideIcon, PersonIcon, SearchIcon, SortIcon } from "../../services/svg.service"


export function BoardFilter() {

    const [isFocused, setIsFocused] = useState(false)
    const filterSearchRef = useRef(null)


    useEffect(() => {
        function handleClickOutsideSearch(event) {
            if (filterSearchRef.current
                && !filterSearchRef.current.contains(event.target)
                //missing logic: && !input.value
            ) {
                setIsFocused(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutsideSearch)

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideSearch)
        }
    }, [])

    function onToggleIsFocused() {
        setIsFocused(!isFocused)
    }

    const dynFocusedClass = isFocused ? 'focused' : ''

    return (
        <div className="board-filter">
            <button title="New task" className="btn new-task">New Task</button>

            <div className={dynFocusedClass + ' btn search'} onClick={onToggleIsFocused} ref={filterSearchRef}>
                <SearchIcon />
                <input className="reset" type="search" placeholder="Search" />
                {isFocused &&
                    <img src="../../public/icons/SettingsKnobs.svg" alt="filter-icon" />
                }
            </div>

            <button className="btn person" title="Filter by person">
                <PersonIcon />
                <span>Person</span>
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
