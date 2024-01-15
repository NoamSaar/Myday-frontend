import { useState } from "react";
import { EditableTxt } from "../../../../EditableTxt";
import { LabelPickerPreview } from "./LabelPickerPreview";

export function LabelList({ labels, handleChange, isEditing }) {

    return (
        <ul className='clean-list manual-select label-list'>
            {labels.map(label => (
                <LabelPickerPreview label={label} handleChange={handleChange} isEditing={isEditing} key={label.id} />
                // <li key={label.id}>
                //     {isEditing ? (
                //         /* Add content for editing state if needed */
                //         <EditableTxt
                //             isEditing={isEditingLabel}
                //             txtValue={label.title || ''}
                //             onTxtClick={() => setIsEditingLabel(true)}
                //             inputValue={label.title || ''}
                //             onInputChange={onChangeTitle}
                //             onEditClose={onGroupEditExit}
                //             style={{ color: groupColor }}
                //             extraBtnsStart={extraTitleInputBtn}

                //         />
                //     ) : (
                //         <button
                //             className='manual-option btn'
                //             onClick={() => handleChange(label.id)}
                //             style={{ backgroundColor: label.color }}
                //             key={label.id}
                //         >
                //             <span>{label.title || ''}</span>
                //         </button>
                //     )}
                // </li>
            ))}
        </ul>
    )
}

