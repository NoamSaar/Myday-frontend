import { useSelector } from "react-redux"
import { setDynamicModal } from "../../../../store/actions/system.actions"

export function StatusPicker({ title, info, onUpdate, taskId }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const color = board[title].find(option => option.title === info.chosenOption).color
    const style = { backgroundColor: color }
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isPickerOpen = fatherId === `${taskId}-statusPicker`

    function onStatusPreviewClick(ev) {
        if (isPickerOpen) {
            setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {}, fatherId: '' })
        } else {
            setDynamicModal({ isOpen: true, boundingRect: ev.target.getBoundingClientRect(), type: 'status picker', data: { selectedStatus: info.chosenOption, onUpdate }, fatherId: `${taskId}-statusPicker` })
        }
    }

    return (
        <li onClick={onStatusPreviewClick} style={style} className="status-picker status-col priority-col" >
            {info.chosenOption}
        </li >
    )
}
