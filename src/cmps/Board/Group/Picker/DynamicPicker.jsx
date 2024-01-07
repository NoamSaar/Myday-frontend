import { DatePicker } from "./DatePicker";
import { FilePicker } from "./FilePicker";
import { LinkPicker } from "./LinkPicker";
import { MemberPicker } from "./MemberPicker";
import { StatusPicker } from "./StatusPicker";

export function DynamicPicker({ title, task, onUpdate }) {
    switch (title) {
        case "status":
            return <StatusPicker title={title} info={{ chosenOption: task[title] }} onUpdate={onUpdate} taskId={task.id} />
        case "priority":
            return <StatusPicker title={title} info={{ chosenOption: task[title] }} onUpdate={onUpdate} taskId={task.id} />
        case "person":
            return <MemberPicker members={task.person} onUpdate={onUpdate} taskId={task.id} />
        case "date":
            return <DatePicker selectedDate={task.date} onChangeDate={onUpdate} taskId={task.id} />
        case "file":
            return <FilePicker file={task.file} onUpdate={onUpdate} taskId={task.id} />
        case "link":
            return <LinkPicker info={task.link} onUpdate={onUpdate} />
        default:
            return <li>UNKNOWN {title}</li>;
    }
}
