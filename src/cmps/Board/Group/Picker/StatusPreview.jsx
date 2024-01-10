import { useSelector } from "react-redux"
import { useRef } from "react"

import { setDynamicModal, resetDynamicModal } from "../../../../store/actions/system.actions"

export function StatusPreview({ title, info, onUpdate, taskId }) {
    const previewBtnRef = useRef(null)

    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const { fatherId, isOpen } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const color = board[title].find(option => option.title === info.chosenOption).color
    const style = { backgroundColor: color }
    const isCurrPickerOpen = fatherId === `${taskId}-${title}Picker`

    // function onStatusPreviewClick(ev) {
    //     if (!isCurrPickerOpen) { //another modal is open
    //         console.log('opening modal from cmp')
    //         setDynamicModal({
    //             isOpen: true,
    //             boundingRect: previewBtnRef.current.getBoundingClientRect(),
    //             type: 'statusPicker',
    //             data: { selectedStatus: info.chosenOption, title, onUpdate },
    //             fatherId: `${taskId}-${title}Picker`,
    //             isPosBlock: true,
    //             isCenter: true,
    //             hasTooltip: true,
    //         })
    //     }
    // }

    function onStatusPreviewClick(ev) {
        // console.log('opening modal from cmp')
        if (isCurrPickerOpen) { //curr modal is open
            resetDynamicModal()
        } else { //another modal is open
            setDynamicModal({
                isOpen: true,
                boundingRect: previewBtnRef.current.getBoundingClientRect(),
                type: 'statusPicker',
                data: { selectedStatus: info.chosenOption, title, onUpdate },
                fatherId: `${taskId}-${title}Picker`,
                isPosBlock: true,
                isCenter: true,
                hasTooltip: true,

            })
        }
    }

    return (
        <li
            onClick={onStatusPreviewClick}
            style={style}
            className="status-preview status-col priority-col"
            ref={previewBtnRef}
        >
            {info.chosenOption}
        </li >
    )
}
