import { useState } from 'react'
import { useSelector } from 'react-redux'


export function StatusPickerModal({ selectedStatus, onChangeStatus }) {
    const { status: statuses } = useSelector((storeState) => storeState.boardModule.currBoard)
    const [statusToEdit, setStatusToEdit] = useState(selectedStatus)

    function handleChange({ target }) {
        let { value } = target
        setStatusToEdit(value)
        onChangeStatus('status', value) //important to pass the value becuse the statusToEdit will update only on nxt render
    }

    return (
        <div className="status-picker-modal">
            <select value={statusToEdit} name="status" onChange={handleChange}>
                {statuses.map(status => (
                    <option key={status.id} value={status.title}>{status.title}</option>
                ))}
            </select>

        </div>
    )
}
