import { useEffect, useState } from "react"
import { FilePreview } from "../Picker/FilePreview"
import { updateTask } from "../../../../store/actions/board.actions"

export function FileSummary({ group, board }) {
    const [files, setFiles] = useState()

    useEffect(() => {
        setFiles(getGroupFiles())
    }, [group])

    function getGroupFiles() {
        return group.tasks
            .map(task => ({ file: task.file, taskId: task.id }))
            .filter(file => file !== undefined)
    }

    function onFileUpdate(field, recivedData, taskId) {
        const task = group.tasks.find(task => task.id === taskId)
        const updatedTask = { ...task, [field]: recivedData }
        updateTask(board._id, group.id, updatedTask)
    }


    if (!files || !files.length) return <li></li>
    return (
        <li className="file-summary">
            <ul className="clean-list flex">

                {files.map((file, idx) => <FilePreview key={idx} file={file.file} parentElementId={group.id} onUpdate={onFileUpdate} taskId={file.taskId} />)}
            </ul>
        </li>
    )
}
