import { useSelector } from "react-redux"

export function StatusPicker({ title, info, onUpdate }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const color = board[title.toLowerCase()].find(option => option.title === info.chosenOption).color
    const style = { backgroundColor: color }


    return (
        <li style={style} className="status-picker status-col priority-col" >
            {info.chosenOption}
        </li >
    )
}
