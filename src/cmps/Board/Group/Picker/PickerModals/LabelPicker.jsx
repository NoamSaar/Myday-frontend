import { useSelector } from 'react-redux'
import { PencilIcon } from '../../../../../services/svg.service'
import { LabelList } from './LabelList'
import { useState } from 'react'
import { updateBoard } from '../../../../../store/actions/board.actions'
import { showErrorMsg } from '../../../../../store/actions/system.actions'
import { boardService } from '../../../../../services/board.service'

export function LabelPicker({ onChangeStatus, title }) {
    const board = useSelector((storeState) => storeState.boardModule.filteredBoard)
    const labels = board[title]
    const [currLabels, setCurrLabels] = useState(labels)
    const [isEditing, setIsEditing] = useState(false)

    function handleChange(newStatus) {
        onChangeStatus([title], newStatus)
    }

    function onLabelsChange(label) {
        const newLabels = currLabels.map(currLabel => currLabel.id === label.id ? label : currLabel)
        setCurrLabels(newLabels)
    }

    async function onAddLabel() {
        try {
            const newLabels = [...currLabels, boardService.getDefaultLabel()]
            setCurrLabels(newLabels)
            const newBoard = { ...board, [title]: currLabels }
            await updateBoard(newBoard)
        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot add label')
        }
    }

    async function onEditBtnClick() {
        try {
            setIsEditing(prev => !prev)
            if (isEditing) {
                const newBoard = { ...board, [title]: currLabels }
                await updateBoard(newBoard)
            }
        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot update labels')
        }
    }

    return (
        <div className="general-modal flex column align-center justify-center status-picker-modal">

            <LabelList labels={currLabels} handleChange={handleChange} isEditing={isEditing} onLabelsChange={onLabelsChange} onAddLabel={onAddLabel} />

            <button className='btn flex align-center justify-center edit-btn' onClick={onEditBtnClick}>
                {!isEditing && <PencilIcon />}
                <p>{isEditing ? 'Apply' : 'Edit Labels'}</p>
            </button>

        </div>
    )
}
