import { useSelector } from "react-redux"
import { useRef } from "react"

import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"
import { utilService } from "../../../../services/util.service"

export function LabelPreview({ title, info, onUpdate, taskId, isChangingToDone }) {
    const previewBtnRef = useRef(null)

    const board = useSelector((storeState) => storeState.boardModule.filteredBoard)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const label = board[title].find(option => option.id === info.chosenOption)
    if (!label) return <li className="status-preview status-col priority-col">Loading...</li>
    const style = { backgroundColor: label.color }
    const isCurrPickerOpen = parentId === `${taskId}-${title}Picker`

    function onLabelPreviewClick(ev) {
        if (isCurrPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: previewBtnRef.current,
                type: 'labelPicker',
                data: { selectedStatus: info.chosenOption, title, onUpdate },
                parentId: `${taskId}-${title}Picker`,
                isPosBlock: true,
                isCenter: true,
                hasCaret: true,

            })
        }
    }

    const animations = ['balloon', 'confetti', 'crazy_balls']

    const dynClass = isChangingToDone && label.id === 'l101'
        ? animations[utilService.getRandomIntInclusive(0, animations.length - 1)]
        : ''


    return (
        <li
            onClick={onLabelPreviewClick}
            style={style}
            className={`status-preview status-col priority-col ${dynClass}`}
            ref={previewBtnRef}
        >
            <p>{label.title}</p>

            <div className="corner-fold"></div>
        </li >
    )
}
