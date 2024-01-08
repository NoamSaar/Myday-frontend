import { DatePreview } from "./DatePreview"
import { FilePreview } from "./FilePreview"
import { LinkPreview } from "./LinkPreview"
import { MemberPreview } from "./MemberPreview"
import { StatusPreview } from "./StatusPreview"

export function DynamicPicker({ title, task, onUpdate, memberOptions }) {
    switch (title) {
        case "status":
            return (
                <StatusPreview
                    title={title}
                    info={{ chosenOption: task[title] }}
                    onUpdate={onUpdate}
                    taskId={task.id}
                />)

        case "priority":
            return (
                <StatusPreview
                    title={title}
                    info={{ chosenOption: task[title] }}
                    onUpdate={onUpdate}
                    taskId={task.id}
                />)

        case "person":
            return (
                <MemberPreview
                    chosenMembers={task.person}
                    memberOptions={memberOptions}
                    onUpdate={onUpdate}
                    taskId={task.id}
                />)

        case "date":
            return (
                <DatePreview
                    selectedDate={task.date}
                    onChangeDate={onUpdate}
                    taskId={task.id}
                />)

        case "file":
            return (
                <FilePreview
                    file={task.file}
                    onUpdate={onUpdate}
                    taskId={task.id}
                />)

        case "link":
            return (
                <LinkPreview
                    info={task.link}
                    onUpdate={onUpdate}
                    taskId={task.id}
                />)

        default:
            return <li>UNKNOWN {title}</li>
    }
}
