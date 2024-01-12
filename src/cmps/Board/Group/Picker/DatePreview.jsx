import { useSelector } from "react-redux"
import { useRef } from "react"

import { utilService } from "../../../../services/util.service"
import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"
import { CloseIcon } from "../../../../services/svg.service"
import { TimeIndicator } from "../Task/TimeIndicator"

export function DatePreview({ selectedDate, onUpdate, taskId }) {
    const previewBtnRef = useRef(null)

    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isCurrPickerOpen = parentId === `${taskId}-datePicker`

    function onDatePreviewClick(ev) {
        if (isCurrPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: previewBtnRef.current,
                type: 'datePicker',
                data: { selectedDate: selectedDate || Date.now(), onUpdate },
                parentId: `${taskId}-datePicker`,
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
            <p className="data-preview-content flex align-center justify-center">
                {selectedDate && utilService.getFormatDate(selectedDate)}
            </p>


            {selectedDate && <>
                {utilService.hasTimePassed(selectedDate) && <div className="time-passed-icon"><p className="flex align-center justify-center">!</p></div>}
                {/* <TimeIndicator timestamp={selectedDate} /> */}
                <button className="btn remove-btn" onClick={onRemoveDateClick}><CloseIcon /></button>
            </>}

        </li>
    )
}
