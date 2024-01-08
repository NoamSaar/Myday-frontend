import { useSelector } from "react-redux"
import { setDynamicModal } from "../../../../store/actions/system.actions"

export function StatusPreview({ title, info, onUpdate, taskId }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const color = board[title].find(option => option.title === info.chosenOption).color
    const style = { backgroundColor: color }
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isPickerOpen = fatherId === `${taskId}-${title}Picker`

    function onStatusPreviewClick(ev) {
        if (isPickerOpen) {
            setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {}, fatherId: '' })
        } else {
            setDynamicModal({
                isOpen: true, boundingRect: ev.target.getBoundingClientRect(), type: 'status picker', data: { selectedStatus: info.chosenOption, title, onUpdate }, fatherId: `${taskId}-${title}Picker`
            })
        }
    }

    return (
        <li onClick={onStatusPreviewClick} style={style} className="status-picker status-col priority-col" >
            {info.chosenOption}
        </li >
    )
}
