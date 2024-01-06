
export function ColorPickerModal({ colors, onColorClick }) {
    return (
        <div className="color-picker-modal">
            {colors.map(color => {
                return <div className="color" onClick={onColorClick} style={{ backgroundColor: color }}></div>
            })}
        </div>
    )
}
