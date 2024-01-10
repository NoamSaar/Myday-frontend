import { useSelector } from "react-redux"
import { useRef } from "react"

import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"

export function LabelPreview({ title, info, onUpdate, taskId }) {
    const previewBtnRef = useRef(null)

    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const color = board[title].find(option => option.title === info.chosenOption).color
    const style = { backgroundColor: color }
    const isCurrPickerOpen = parentId === `${taskId}-${title}Picker`

    function onLabelPreviewClick(ev) {
        if (isCurrPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: previewBtnRef.current,
                type: 'labelPicker',
                data: { selectedStatus: info.chosenOption, title, onUpdate },
                parentId: `${taskId}-${title}Picker`,
                isPosBlock: true,
                isCenter: true,
                hasTooltip: true,

            })
        }
    }

    return (
        <li
            onClick={onLabelPreviewClick}
            style={style}
            className="status-preview status-col priority-col"
            ref={previewBtnRef}
        >
            <p>{info.chosenOption}</p>

            <div className="corner-fold"></div>
        </li >
    )
}
