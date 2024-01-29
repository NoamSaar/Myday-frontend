import { useState } from "react"
import { useSelector } from "react-redux"
import { setSortBy } from "../../store/actions/board.actions"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
// import { labelImg } from "../../../public/img/col-types/color-column-icon.svg"
import { CustomSelect } from "../CustomSelect"
import { SortDownIcon, SortUpIcon } from "../../services/svg.service"

export function SortPicker() {
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
        { value: 'title', title: 'Name', img: "../../../public/img/col-types/name-column-icon.svg" },
        { value: 'status', title: 'Status', img: "../../../public/img/col-types/color-column-icon.svg" },
        { value: 'date', title: 'Date', img: "../../../public/img/col-types/date-column-icon.svg" },
        { value: 'priotity', title: 'Priority', img: "../../../public/img/col-types/color-column-icon.svg" },
    ]

    const dirOptions = [
        { value: 1, title: 'Ascending', img: "../../../public/img/col-types/name-column-icon.svg" },
        { value: -1, title: 'Descending', img: "../../../public/img/col-types/color-column-icon.svg" },

    ]


    const { type, dir } = sortByToEdit

    return (
        <section className="sort-picker general-modal board-member-select">

            <h4>Sort by</h4>

            <CustomSelect options={typeOptions} onSelect={handleChange} name="type" />
            <CustomSelect options={dirOptions} onSelect={handleChange} name="dir" />

            {/* <select
                name="type"
                onChange={handleChange}
                value={type}
            >
                <option value={'title'}>Name</option>
                <option value={'status'}>Status</option>
                <option value={'date'}>Date</option>
                <option value={'priotity'}>Priority</option>
            </select>

            <select
                name="dir"
                onChange={handleChange}
                value={dir}
            >
                <option value={1}>Ascending</option>
                <option value={-1}>Descending</option>
            </select> */}

            <button className="btn">+ Add new sort</button>

        </section>
    )
}
