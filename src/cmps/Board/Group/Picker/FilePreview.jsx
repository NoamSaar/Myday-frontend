import { useRef } from "react"
import { resetDynamicModal, setDynamicModal } from "../../../../store/actions/system.actions"
import { useSelector } from "react-redux"

export function FilePreview({ file, onUpdate, taskId }) {
    const previewBtnRef = useRef(null)

    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isCurrPickerOpen = parentId === `${taskId}-filePicker`

    function onFilePreviewClick() {
        if (isCurrPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: previewBtnRef.current,
                type: 'filePicker',
                data: {
                    file,
                    onChangeFile: onUpdate
                },
                parentId: `${taskId}-filePicker`,
                isPosBlock: true,
            })
        }
    }

    return (
        <li ref={previewBtnRef} onClick={onFilePreviewClick}
            className="file-preview file-col flex align-center-justify-center"
        >
            {file && <img src={file} />}
        </li>
    )
}
