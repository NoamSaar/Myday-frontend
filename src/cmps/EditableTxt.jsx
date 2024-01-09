
export function EditableTxt({ isEditing, txtValue, onTxtClick, inputValue, inputName = '', onInputChange, onEditClose, extraBtns, style = {} }) {
    return (
        <div className="editable-txt-container">
            {isEditing ? (
                <div
                    tabIndex={0}
                    onBlur={onEditClose}
                    className="focused-input flex align-center"
                >

                    {(extraBtns && extraBtns.length) && extraBtns.map((btn, idx) => {
                        return <div
                            key={idx}
                            className={btn.className}
                            style={btn.style || {}}
                            onMouseDown={btn.onMouseDown}
                        >
                        </div>
                    })}

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
                <p
                    className="editable-txt"
                    onClick={onTxtClick}
                    style={style}>
                    {txtValue}
                </p>
            )}
        </div>
    )
}