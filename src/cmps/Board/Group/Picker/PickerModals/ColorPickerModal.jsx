
export function ColorPickerModal({ colors, onColorClick }) {
    return (
        <div className="color-picker-modal">
            {colors.map(color => {
                <div className="color" onClick={onColorClick} style={{ backgroundColor: color }}></div>
            })}
        </div>
    )
}
