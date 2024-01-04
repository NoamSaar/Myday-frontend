
export function FilePicker({ file, onUpdate }) {
    return (
        <li className="file-picker file-col">
            {file && <img src={file} />}
        </li>
    )
}
