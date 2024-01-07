import { useState } from "react"
import { setDynamicModal } from "../../../../store/actions/system.actions"
import { useSelector } from "react-redux"
import { utilService } from "../../../../services/util.service"

export function DatePicker({ selectedDate, onChangeDate, taskId }) {
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isPickerOpen = fatherId === `${taskId}-datePicker`

    function onDatePreviewClick(ev) {
        console.log('ev.target.getBoundingClientRect()', ev.target.getBoundingClientRect())
        if (isPickerOpen) {
            setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {}, fatherId: '' })
        } else {
            setDynamicModal({ isOpen: true, boundingRect: ev.target.getBoundingClientRect(), type: 'date picker', data: { selectedDate, onChangeDate }, fatherId: `${taskId}-datePicker` })
        }
    }

    return (
        <li onClick={onDatePreviewClick} className="date-col">
            {selectedDate && utilService.getFormatDate(selectedDate)}
        </li>
    )
}
