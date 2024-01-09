import { DatePreview } from "./DatePreview"
import { FilePreview } from "./FilePreview"
import { LinkPreview } from "./LinkPreview"
import { MemberPreview } from "./MemberPreview"
import { LabelPreview } from "./LabelPreview"

export function DynamicPreview({ title, task, onUpdate, memberOptions }) {
    switch (title) {

        case "status":
        case "priority":
            return (
                <LabelPreview
                    title={title}
                    info={{ chosenOption: task[title] }}
                    onUpdate={onUpdate}
                    taskId={task.id}
                />)

        case "member":
            return (
                <MemberPreview
                    chosenMembers={task.members}
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
