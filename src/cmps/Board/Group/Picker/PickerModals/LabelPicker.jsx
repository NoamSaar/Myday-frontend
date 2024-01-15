import { useSelector } from 'react-redux'

export function LabelPicker({ onChangeStatus, title }) {
    const { [title]: statuses } = useSelector((storeState) => storeState.boardModule.filteredBoard)

    function handleChange(newStatus) {
        onChangeStatus([title], newStatus)
    }

    return (
        <div className="general-modal flex column align-center justify-center status-picker-modal">

            <ul className='clean-list manual-select'>
                {statuses.map(status => (
                    <li className='manual-option btn'
                        onClick={() => handleChange(status.id)}
                        style={{ backgroundColor: status.color }}
                        key={status.id} value={status.title || ''}
                    >
                        <span>
                            {status.title || ''}
                        </span>
                    </li>
                ))}
            </ul>

            <button className='btn'>
                <p>Edit Labels</p>
            </button>

        </div>
    )
}
