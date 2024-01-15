import { useSelector } from 'react-redux'
import { PencilIcon } from '../../../../../services/svg.service'
import { LabelList } from './LabelList'
import { useState } from 'react'

export function LabelPicker({ onChangeStatus, title }) {
    const { [title]: statuses } = useSelector((storeState) => storeState.boardModule.filteredBoard)
    const [isEditing, setIsEditing] = useState(false)

    function handleChange(newStatus) {
        onChangeStatus([title], newStatus)
    }

    return (
        <div className="general-modal flex column align-center justify-center status-picker-modal">

            <LabelList labels={statuses} handleChange={handleChange} isEditing={isEditing} />

            <button className='btn flex align-center justify-center' onClick={() => setIsEditing(prev => !prev)}>
                {!isEditing && <PencilIcon />}
                <p>{isEditing ? 'Apply' : 'Edit Labels'}</p>
            </button>

        </div>
    )
}
