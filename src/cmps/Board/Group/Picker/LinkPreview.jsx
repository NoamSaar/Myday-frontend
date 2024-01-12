import { useSelector } from "react-redux"
import { useRef } from "react"

import { resetDynamicModal, setDynamicModal } from "../../../../store/actions/system.actions"
import { CloseIcon } from "../../../../services/svg.service"

export function LinkPreview({ info, onUpdate, taskId }) {
    const previewBtnRef = useRef(null)
    console.log('info', info)

    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isCurrPickerOpen = parentId === `${taskId}-linkPicker`

    function onLinkPreviewClick(ev) {
        if (isCurrPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: previewBtnRef.current,
                type: 'linkPicker',
                data: {
                    url: info && info.url || '',
                    displayTxt: info && info.displayTxt || '',
                    onChangeLink: onUpdate
                },
                parentId: `${taskId}-linkPicker`,
                isPosBlock: true,
            })
        }
    }

    function onRemoveLinkClick(ev) {
        ev.stopPropagation()
        onUpdate('link', null)
    }

    return (
        <li onClick={onLinkPreviewClick} className="data-preview-container link-preview link-col" ref={previewBtnRef}>
            <button className="flex justify-center align-center data-preview-content">
                {(info && info.displayTxt)
                    ?
                    <a target="_blank" href={info && info.url}>{info.displayTxt}</a>
                    :
                    info && <a target="_blank" href={info && info.url}>{info.url}</a>
                }
            </button>

            {info && <button className="btn remove-btn" onClick={onRemoveLinkClick}><CloseIcon /></button>}
        </li>
    )
}
