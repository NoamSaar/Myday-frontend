import { useEffect, useState } from "react";
import { LabelPickerPreview } from "./LabelPickerPreview";

export function LabelList({ labels, handleChange, isEditing, onLabelsChange }) {

    return (
        <ul className='clean-list manual-select label-list'>
            {labels.map(label => (
                <LabelPickerPreview label={label} handleChange={handleChange} isEditing={isEditing} onLabelsChange={onLabelsChange} key={label.id} />
            ))}
        </ul>
    )
}

