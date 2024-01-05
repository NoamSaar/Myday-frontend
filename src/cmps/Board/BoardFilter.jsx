import { useState } from "react"


export function BoardFilter() {

    const [isActive, setIsActive] = useState(false)
    function onToggleIsActive() {
        setIsActive(!isActive)
    }

    const dynActiveClass = isActive ? 'active' : ''

    return (
        <div className="board-filter">
            <button title="New task" className="btn new-task">New Task</button>

            <div className={dynActiveClass + ' btn search'} onClick={onToggleIsActive}>
                <img src="../../public/icons/Search.svg" alt="search-icon" />
                <input className="reset" type="search" placeholder="Search" />
                {isActive &&
                    <img src="../../public/icons/SettingsKnobs.svg" alt="filter-icon" />
                }
            </div>

            {/* <div className={`search-section flex justify-center aligh-center${isActive ? 'active' : ''}`}
                onClick={onToggleIsActive}>
                <div className="btn">
                    <img src="../../public/icons/Search.svg" alt="search-icon" />
                </div>
                <input type="search" placeholder="Search" />
            </div> */}

            <button className="btn person" title="Filter by person">
                <img src="../../public/icons/Person.svg" alt="Person-icon" />
                <span>Person</span>
            </button>

            <button className="btn filter" title="Filter by anything">
                <img src="../../public/icons/Filter.svg" alt="Filter-icon" />
                <span>Filter</span>
            </button>

            <button className="btn sort" title="Sort by column">
                <img src="../../public/icons/Sort.svg" alt="Sort-icon" />
                <span>Filter</span>
            </button>

            <button className="btn hide" title="Hidden columns">
                <img src="../../public/icons/Hide.svg" alt="Hide-icon" />
                <span>Hide</span>
            </button>

        </div>
    )
}
