import { useSelector } from "react-redux"
import { useRef } from "react"

import { utilService } from "../../../../services/util.service"
import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"

export function DatePreview({ selectedDate, onChangeDate, taskId }) {
    const previewBtnRef = useRef(null)

    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isPickerOpen = fatherId === `${taskId}-datePicker`

    function onDatePreviewClick(ev) {
        if (isPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: previewBtnRef.current,
                type: 'datePicker',
                data: { selectedDate: selectedDate || Date.now(), onChangeDate },
                fatherId: `${taskId}-datePicker`,
                isPosBlock: true,
                isCenter: true
            })
        }
    }

    return (
        <li
            onClick={onDatePreviewClick}
            className="date-col"
            ref={previewBtnRef}
        >
            {selectedDate && utilService.getFormatDate(selectedDate)}
        </li>
    )
}
