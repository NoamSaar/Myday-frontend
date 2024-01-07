import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { utilService } from '../../../../../services/util.service';

export function DatePickerModal({ selectedDate, onChangeDate }) {
    console.log('new Date(selectedDate)', new Date(selectedDate))
    function onDateSelect(ev) {
        console.log('ev', ev)
        // onChangeDate('date', data)
    }
    return (
        <div className="date-picker-modal">
            <DayPicker mode="single" required selected={new Date(selectedDate)} onSelect={onDateSelect} month={new Date(selectedDate)} />
        </div>
    )
}
