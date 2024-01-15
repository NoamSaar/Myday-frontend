import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { resetDynamicModal, setDynamicModal } from "../../../../../store/actions/system.actions"
import { getBoardColors } from "../../../../../store/actions/board.actions"
import { EditableTxt } from "../../../../EditableTxt"

export function LabelPickerPreview({ label, isEditing, handleChange }) {
    const colorBtnParentRef = useRef(null)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const [isEditingLabel, setIsEditingLabel] = useState(false)
    const [labelTitle, setLabelTitle] = useState(label.title || 'Default Label')
    const [labelColor, setLabelColor] = useState(label.color)

    const isColorPickerOpen = parentId === `${label.id}-colorPicker`
    const colors = getBoardColors()

    useEffect(() => {
        setLabelTitle(label.title || 'Default Label')
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

        if (isColorPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: colorBtnParentRef.current,
                type: 'colorPicker',
                data: { colors, onColorClick: onChangeColor },
                parentId: `${label.id}-colorPicker`,
                isPosBlock: true,
            })
        }
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
                    txtValue={labelTitle || ''}
                    onTxtClick={() => setIsEditingLabel(true)}
                    inputValue={labelTitle || ''}
                    onInputChange={onTitleChange}
                    onEditClose={() => console.log('hi')}
                    extraBtnsStart={extraTitleInputBtn}
                    isBtnsInTxt={true}
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
        </li>
    )
}
