import { useEffect, useRef, useState } from "react"


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
                <img src="../../public/icons/Search.svg" alt="search-icon" />
                <input className="reset" type="search" placeholder="Search" />
                {isFocused &&
                    <img src="../../public/icons/SettingsKnobs.svg" alt="filter-icon" />
                }
            </div>

            <button className="btn person" title="Filter by person">
                {/* <img src="../../public/icons/Person.svg" alt="Person-icon" /> */}
                <img src="../../public/icons/CirceledPerson.svg" alt="Person-icon" />
                <span>Person</span>
            </button>

            <button className="btn filter" title="Filter by anything">
                <img src="../../public/icons/Filter.svg" alt="Filter-icon" />
                <span>Filter</span>
            </button>

            <button className="btn sort" title="Sort by column">
                <img src="../../public/icons/SortArrows.svg" alt="Sort-icon" />
                <span>Sort</span>
            </button>

            <button className="btn hide" title="Hidden columns">
                <img src="../../public/icons/Hide.svg" alt="Hide-icon" />
                <span>Hide</span>
            </button>

        </div>
    )
}
