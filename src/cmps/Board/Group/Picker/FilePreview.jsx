
export function FilePreview({ file, onUpdate }) {
    return (
        <li className="file-preview file-col flex align-center-justify-center">
            {file && <img src={file} />}
        </li>
    )
}
