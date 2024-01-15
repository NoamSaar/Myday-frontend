import { useEffect, useRef, useState } from "react"
import { getBoardColors } from "../../../../../store/actions/board.actions"
import { EditableTxt } from "../../../../EditableTxt"
import { ColorPicker } from "./ColorPicker"

export function LabelPickerPreview({ label, isEditing, handleChange, onLabelsChange }) {
    const colorBtnParentRef = useRef(null)

    const [isEditingLabel, setIsEditingLabel] = useState(false)
    const [labelTitle, setLabelTitle] = useState(label.title)
    const [labelColor, setLabelColor] = useState(label.color)
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    const colors = getBoardColors()

    useEffect(() => {
        setLabelTitle(label.title)
        setLabelColor(label.color)
    }, [label])

    function onTitleChange({ target }) {
        const title = target.value
        setLabelTitle(title)
    }

    function onChangeColor(color) {
        setLabelColor(color)
    }

    function onColorDisplayClick(ev) {
        ev.stopPropagation()
        setIsColorPickerOpen(prevIsOpen => !prevIsOpen)
    }

    function onEditClose() {
        onLabelsChange({ ...label, title: labelTitle, color: labelColor })
        setIsEditingLabel(false)
    }

    const extraTitleInputBtn = [
        {
            className: "label-color-display",
            style: { backgroundColor: labelColor },
            onMouseDown: onColorDisplayClick
        }
    ]

    return (
        <li className="label-picker-preview" ref={colorBtnParentRef}>
            {isEditing ? (
                <EditableTxt
                    isEditing={isEditingLabel}
                    txtValue={labelTitle || 'Default Label'}
                    onTxtClick={() => setIsEditingLabel(true)}
                    inputValue={labelTitle || ''}
                    onInputChange={onTitleChange}
                    onEditClose={onEditClose}
                    extraBtnsStart={extraTitleInputBtn}
                    isBtnsInTxt={true}
                    placeholder={labelTitle ? 'Add Label' : 'Default Label'}
                />
            ) : (
                <button
                    className='manual-option btn'
                    onClick={() => handleChange(label.id)}
                    style={{ backgroundColor: label.color }}
                    key={label.id}
                >
                    <span>{labelTitle || ''}</span>
                </button>
            )}

            {isColorPickerOpen && <ColorPicker colors={colors} onColorClick={onChangeColor} />}
        </li>
    )
}
