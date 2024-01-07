import { useSelector } from "react-redux"

export function LinkPicker({ info, onUpdate, taskId }) {
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isPickerOpen = fatherId === `${taskId}-linkPicker`

    function onLinkPreviewClick(ev) {
        if (isPickerOpen) {
            setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {}, fatherId: '' })
        } else {
            setDynamicModal({
                isOpen: true,
                boundingRect: ev.target.getBoundingClientRect(),
                type: 'link picker',
                data: { selectedDate, onChangeDate },
                fatherId: `${taskId}-linkPicker`
            })
        }
    }

    return (
        <li className="link-picker link-col">
            <button>
                {info && info.displayTxt ? <a target="_blank" href={info && info.url}>{info.displayTxt}</a> : info && <a target="_blank" href={info && info.url}>{info.url}</a>}
            </button>
        </li>
    )
}
