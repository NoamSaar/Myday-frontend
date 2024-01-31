import { useState } from "react"
import { useSelector } from "react-redux"
import { setSortBy } from "../../store/actions/board.actions"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { CustomSelect } from "../CustomSelect"
import { SortDownIcon, SortUpIcon } from "../../services/svg.service"

export function SortPicker() {
    const isMobile = useSelector((storeState) => storeState.systemModule.isMobile)
    const sortBy = useSelector((storeState) => storeState.boardModule.sortBy)
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)

    useEffectUpdate(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function onSetSort(sortByToEdit) {
        setSortBy(sortByToEdit)
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
        setSortByToEdit(prevSort => ({ ...prevSort, [field]: value }))
    }

    const typeOptions = [
        { value: 'title', title: 'Name', img: "/img/col-types/name-column-icon.svg", imgClr: '#ffcc00' },
        { value: 'status', title: 'Status', img: "/img/col-types/color-column-icon.svg", imgClr: '#11dd80' },
        { value: 'date', title: 'Date', img: "/img/col-types/date-column-icon.svg", imgClr: '#11dd80' },
        { value: 'priotity', title: 'Priority', img: "/img/col-types/color-column-icon.svg", imgClr: '#11dd80' },
    ]

    const dirOptions = [
        { value: 1, title: 'Ascending', svgCmp: <SortDownIcon /> },
        { value: -1, title: 'Descending', svgCmp: <SortUpIcon /> },

    ]


    const { type, dir } = sortByToEdit

    return (
        <section className="sort-picker general-modal">

            <h4 className="title">Sort by</h4>

            <div className="selects">
                <CustomSelect options={typeOptions} onSelect={handleChange} name="type" selectedOptValue={type} openUp={isMobile} />
                <CustomSelect options={dirOptions} onSelect={handleChange} name="dir" selectedOptValue={dir} openUp={isMobile} />
            </div>

            {/* <button className="btn">+ Add new sort</button> */}

        </section>
    )
}
