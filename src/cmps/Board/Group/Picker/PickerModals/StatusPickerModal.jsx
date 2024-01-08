import { useState } from 'react'
import { useSelector } from 'react-redux'


export function StatusPickerModal({ selectedStatus, onChangeStatus }) {
    const { status: statuses } = useSelector((storeState) => storeState.boardModule.currBoard)
    const [statusToEdit, setStatusToEdit] = useState(selectedStatus)

    function handleChange(newStatus) {
        setStatusToEdit(newStatus)
        onChangeStatus('status', newStatus)
    }
    // function handleChange({ target }) {
    //     let { value } = target
    //     setStatusToEdit(value)
    //     onChangeStatus('status', value) 
    // }

    return (
        <div className="general-modal status-picker-modal">
            {/* <select value={statusToEdit} name="status" onChange={handleChange}>
                {statuses.map(status => (
                    <option key={status.id} value={status.title}>{status.title}</option>
                ))}
            </select> */}

            <ul className='clean-list manual-select'>
                {statuses.map(status => (
                    <li className='manual-option btn'
                        onClick={() => handleChange(status.title)}
                        style={{ backgroundColor: status.color }}
                        key={status.id} value={status.title || ''}
                    >
                        <span>
                            {status.title || ''}
                        </span>
                    </li>
                ))}
            </ul>

        </div>
    )
}
