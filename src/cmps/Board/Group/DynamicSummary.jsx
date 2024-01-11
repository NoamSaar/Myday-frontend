import { GroupSummary } from "./Summary/GroupSummary"
import { LabelSummary } from "./Summary/LabelSummary"
import { Timeline } from "./Summary/Timeline"

export default function DynamicSummary({ title, group, board }) {
    switch (title) {

        case "member":
            return (
                <li></li>)

        case "status":
        case "priority":
            return (
                <LabelSummary title={title} group={group} board={board} />)

        case "date":
            return (
                <Timeline group={group} board={board} defaultWidth={'174px'} />)

        // case "file":
        //     return (
        //         <FilePreview
        //             file={task.file}
        //             onUpdate={onUpdate}
        //             taskId={task.id}
        //         />)

        // case "link":
        //     return (
        //         <LinkPreview
        //             info={task.link}
        //             onUpdate={onUpdate}
        //             taskId={task.id}
        //         />)

        default:
            return <li>UNKNOWN {title}</li>
    }
}
