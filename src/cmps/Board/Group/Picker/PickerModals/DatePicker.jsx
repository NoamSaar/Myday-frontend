import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function DatePicker({ selectedDate, onUpdate }) {
    const [date, setDate] = useState(new Date(selectedDate))

    function onDateSelect(newDate) {
        onUpdate('date', Date.parse(newDate))
        setDate(newDate)
    }

    return (
        <div className="general-modal date-picker-modal">
            <DayPicker
                mode="single"
                required
                selected={date}
                onSelect={onDateSelect}
                defaultMonth={date}
            />
        </div>
    )
}
