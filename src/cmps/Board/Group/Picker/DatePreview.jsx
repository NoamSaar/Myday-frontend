import { useSelector } from "react-redux"
import { utilService } from "../../../../services/util.service"
import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"

export function DatePreview({ selectedDate, onChangeDate, taskId }) {
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isPickerOpen = fatherId === `${taskId}-datePicker`

    function onDatePreviewClick(ev) {
        if (isPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                boundingRect: ev.target.getBoundingClientRect(),
                type: 'datePicker',
                data: { selectedDate: selectedDate || Date.now(), onChangeDate },
                fatherId: `${taskId}-datePicker`,
                isPosBlock: true
            })
        }
    }

    return (
        <li onClick={onDatePreviewClick} className="date-col">
            {selectedDate && utilService.getFormatDate(selectedDate)}
        </li>
    )
}
