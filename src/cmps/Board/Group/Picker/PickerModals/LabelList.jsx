import { LabelPickerPreview } from "./LabelPickerPreview";

export function LabelList({ labels, handleChange, isEditing, onLabelsChange, onAddLabel }) {

    return (
        <ul className='clean-list manual-select label-list'>
            {labels.map(label => (
                <LabelPickerPreview label={label} handleChange={handleChange} isEditing={isEditing} onLabelsChange={onLabelsChange} key={label.id} />
            ))}

            {isEditing && <li>
                <button className="btn full-width flex align-center justify-center add-label-btn" onClick={onAddLabel}>Add Label</button>
            </li>}
        </ul>
    )
}

