import { useEffect, useRef, useState } from "react"
import { FilterIcon, HideIcon, PersonIcon, SearchIcon, SettingsKnobsIcon, SortIcon } from "../../services/svg.service"
import { addTask } from "../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal } from "../../store/actions/system.actions"


export function BoardFilter({ board, filterBy, onSetFilter }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
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

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onToggleIsFocused() {
        setIsFocused(!isFocused)
    }

    async function onAddTask() {
        try {
            const taskTitle = 'New Item'
            await addTask(board._id, board.groups[0].id, taskTitle, true)
        } catch (error) {
            console.error("Error adding new task:", error)
        }
    }

    function toggleMenu(ev) {
        ev.stopPropagation()
        if (isMenuOpen) {
            //updating modal in store
            resetDynamicModal()
            setIsMenuOpen(false)
        } else {
            //updating modal in store
            setDynamicModal({
                isOpen: true,
                boundingRect: ev.target.getBoundingClientRect(),
                type: 'menu options',
                data: { options: menuOptions },
                isPosBlock: true
            })
            setIsMenuOpen(true)
        }
    }

    const menuOptions = [
        {
            icon: <PersonIcon />,
            title: <select value={filterByToEdit.member} name="member" onChange={handleChange}>
                <option value="">All</option>
                <>
                    {board.members.map(member => (
                        <option key={member._id} value={member._id}>
                            {member.fullname}
                            {/* <img src={member.imgUrl}></img> */}
                        </option>
                    ))}
                </>
            </select>,
            onOptionClick: () => {
                console.log('hi')
            }
        },
    ]

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

    const dynFocusedClass = isFocused ? 'focused' : ''
    const { txt } = filterByToEdit


    return (
        <div className="board-filter">

            <button title="New task" className="btn new-task" onClick={onAddTask}>
                <span>New Task</span>
            </button>

            <div className={dynFocusedClass + ' btn search'} onClick={onToggleIsFocused} ref={filterSearchRef}>
                <SearchIcon />

                {/* <form> */}
                <input
                    className="reset"
                    type="search"
                    placeholder="Search"
                    value={txt}
                    onChange={handleChange}
                    name="txt"
                    autoComplete="off"
                />
                {/* </form> */}

                {isFocused &&
                    <SettingsKnobsIcon />
                }
            </div>

            <button className="btn person" title="Filter by person" onClick={toggleMenu}>
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
