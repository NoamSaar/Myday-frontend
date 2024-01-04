
export function StatusPicker({ title, info, onUpdate }) {
    return (
        <li className="status-picker">
            {info.chosenOption}
        </li>
    )
}
