import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useState } from 'react'

export function DatePickerModal({ selectedDate, onChangeDate }) {
    const [date, setDate] = useState(new Date(selectedDate))

    function onDateSelect(newDate) {
        onChangeDate('date', Date.parse(newDate))
        setDate(newDate)
    }

    return (
        <div className="general-modal date-picker-modal">
            <DayPicker mode="single" required selected={date} onSelect={onDateSelect} month={date} />
        </div>
    )
}
