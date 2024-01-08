
export function ColorPickerModal({ colors, onColorClick }) {
    return (
        <div className="color-picker-modal">
            {colors.map((color, idx) => {
                return <div
                    key={idx}
                    className="color"
                    onClick={() => onColorClick(color)}
                    style={{ backgroundColor: color }}
                ></div>
            })}
        </div>
    )
}
