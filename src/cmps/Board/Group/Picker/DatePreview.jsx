import { useSelector } from "react-redux"
import { useRef } from "react"

import { utilService } from "../../../../services/util.service"
import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"

export function DatePreview({ selectedDate, onChangeDate, taskId }) {
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
                data: { selectedDate: selectedDate || Date.now(), onChangeDate },
                parentId: `${taskId}-datePicker`,
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
