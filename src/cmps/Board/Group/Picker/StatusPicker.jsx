import { useSelector } from "react-redux"
import { StatusPickerModal } from "./PickerModals/StatusPickerModal"
import { useState } from "react"

export function StatusPicker({ title, info, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const options = board[title.toLowerCase()]
    const color = options.find(option => option.title === info.chosenOption).color
    const style = { backgroundColor: color }


    return (
        <li style={style} className="status-picker status-col priority-col" >
            <p onClick={() => setIsModalOpen(prev => !prev)}>{info.chosenOption}</p>

            {isModalOpen && <StatusPickerModal options={options} onUpdate={onUpdate} />}
        </li >
    )
}
