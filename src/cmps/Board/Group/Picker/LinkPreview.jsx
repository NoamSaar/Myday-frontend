import { useSelector } from "react-redux"
import { resetDynamicModal, setDynamicModal } from "../../../../store/actions/system.actions"

export function LinkPreview({ info, onUpdate, taskId }) {
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isPickerOpen = fatherId === `${taskId}-linkPicker`

    function onLinkPreviewClick(ev) {
        if (isPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                boundingRect: ev.target.getBoundingClientRect(),
                type: 'linkPicker',
                data: {
                    url: info && info.url || '',
                    displayTxt: info && info.displayTxt || '',
                    onChangeLink: onUpdate
                },
                fatherId: `${taskId}-linkPicker`,
                isPosBlock: true,
                isCenter: true
            })
        }
    }

    return (
        <li onClick={onLinkPreviewClick} className="link-preview link-col">
            <button className="flex justify-center align-center">
                {(info && info.displayTxt)
                    ?
                    <a target="_blank" href={info && info.url}>{info.displayTxt}</a>
                    :
                    info && <a target="_blank" href={info && info.url}>{info.url}</a>
                }
            </button>
        </li>
    )
}
