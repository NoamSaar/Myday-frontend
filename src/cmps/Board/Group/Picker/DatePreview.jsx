import { useSelector } from "react-redux"
import { useRef } from "react"

import { utilService } from "../../../../services/util.service"
import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"
import { CloseIcon } from "../../../../services/svg.service"

export function DatePreview({ task, onUpdate }) {
    const previewBtnRef = useRef(null)

    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isCurrPickerOpen = parentId === `${task.id}-datePicker`
    const selectedDate = task.date
    const hasTimePassed = utilService.hasTimePassed(selectedDate)
    const isTaskDone = task.status === 'l101'

    function onDatePreviewClick(ev) {
        if (isCurrPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: previewBtnRef.current,
                type: 'datePicker',
                data: { selectedDate: selectedDate || Date.now(), onUpdate },
                parentId: `${task.id}-datePicker`,
                isPosBlock: true,
                isCenter: true
            })
        }
    }

    function onRemoveDateClick(ev) {
        ev.stopPropagation()
        onUpdate('date', null)
    }

    return (
        <li
            onClick={onDatePreviewClick}
            className="date-col data-preview-container date-preview"
            ref={previewBtnRef}
        >
            <p className={`${(hasTimePassed && isTaskDone) && 'line-through'} data-preview-content flex align-center justify-center`}>
                {selectedDate && utilService.getFormatDate(selectedDate)}
            </p>


            {selectedDate && <>
                {hasTimePassed && <div className={`${!isTaskDone ? 'red' : 'green'} time-passed-icon`}><p className="flex align-center justify-center">!</p></div>}
                <button className="btn remove-btn" onClick={onRemoveDateClick}><CloseIcon /></button>
            </>}

        </li>
    )
}
