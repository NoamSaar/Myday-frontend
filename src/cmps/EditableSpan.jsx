
export function EditableSpan({ isEditing, spanValue, onSpanClick, inputValue, inputName, onInputChange, onEditClose, extraBtns, style = {} }) {
    return (
        <div className="editable-span">
            {isEditing ? (
                <div
                    tabIndex={0}
                    onBlur={onEditClose}
                    className="focused-input flex align-center"
                >

                    {extraBtns && extraBtns.map((Btn, index) => <Btn key={index} />)}

                    <form onSubmit={ev => (ev.preventDefault(), onEditClose())}>
                        <input
                            name={inputName}
                            className="reset"
                            type="text"
                            autoFocus
                            style={style}
                            value={inputValue}
                            onChange={onInputChange}
                        //   onBlur={onEditClose}
                        />
                    </form>

                </div>
            ) : (
                <span
                    onClick={onSpanClick}
                    style={style}>
                    {spanValue}
                </span>
            )}
        </div>
    )
}



// {isEditing ? (
//     <div
//         tabIndex={0}
//         onBlur={onGroupEditExit}
//         className="focused-input group-title-edit-container flex align-center"
//     >
//         <div
//             className="group-color-display"
//             style={{ backgroundColor: groupColor }}
//             onMouseDown={onColorDisplayClick}>
//         </div>

//         <form onSubmit={ev => (ev.preventDefault(), onGroupEditExit())}>
//             <input
//                 className="reset"
//                 type="text"
//                 autoFocus
//                 style={{ color: groupColor }}
//                 value={groupTitle}
//                 onChange={onChangeTitle}
//             // onBlur={onGroupEditExit}
//             />
//         </form>
//     </div>
// ) : (
//     <h4 style={{ color: groupColor }} className="editable-txt"
//         onClick={() => setIsEditing(true)}
//     >
//         {highlightText(groupTitle, filterBy.txt)}
//     </h4>
// )}