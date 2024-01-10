import { useRef, useState } from "react"
import { resetDynamicModal } from "../../../../../store/actions/system.actions"
import { AttachIcon } from "../../../../../services/svg.service"

export function FilePicker({ chosenFile, changeFile }) {
    const [newFile, setNewFile] = useState(chosenFile)
    const fileInputRef = useRef(null);

    function onUploadFile(ev) {
        const file = ev.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewFile(reader.result)
                changeFile('file', reader.result)
                resetDynamicModal()
            }
            reader.readAsDataURL(file)
        }
    }

    const options = [
        {
            icon: <AttachIcon />,
            title: 'From Computer',
            onOptionClick: () => {
                fileInputRef.current.click();
            }
        },
    ]

    return (
        <div className="general-modal menu-option-modal relative">
            {
                options.map((option, idx) => (
                    <div key={idx} className="btn" onClick={option.onOptionClick}>
                        {option.icon}
                        <p>{option.title}</p>
                    </div>
                ))
            }
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"  // Specify the accepted file types if needed
                value={newFile ? `File: ${newFile}` : ''}
                style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: '11px',
                    left: '51px',
                    scale: '1.5',
                    opacity: 0,
                }}
                onChange={onUploadFile}
            />
        </div>
    )
}
