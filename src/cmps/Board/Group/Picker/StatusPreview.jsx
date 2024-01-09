import { useSelector } from "react-redux"
import { useRef } from "react"

import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"

export function StatusPreview({ title, info, onUpdate, taskId }) {
    const previewBtnRef = useRef(null)

    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const color = board[title].find(option => option.title === info.chosenOption).color
    const style = { backgroundColor: color }
    const isPickerOpen = fatherId === `${taskId}-${title}Picker`

    function onStatusPreviewClick(ev) {
        if (isPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                boundingRect: previewBtnRef.current.getBoundingClientRect(),
                type: 'statusPicker',
                data: { selectedStatus: info.chosenOption, title, onUpdate },
                fatherId: `${taskId}-${title}Picker`,
                isPosBlock: true,
                isCenter: true
            })
        }
    }

    return (
        <li
            onClick={onStatusPreviewClick}
            style={style}
            className="status-preview status-col priority-col"
            ref={previewBtnRef}
        >
            <p>{info.chosenOption}</p>

            <div className="corner-fold"></div>
        </li >
    )
}
