
export function FilePreview({ file, onUpdate }) {
    return (
        <li className="file-preview file-col">
            {file && <img src={file} />}
        </li>
    )
}
