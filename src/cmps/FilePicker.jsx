
export function FilePicker({ file, onUpdate }) {
    return (
        <li className="file-picker">
            {file && <img src={file} />}
        </li>
    )
}
