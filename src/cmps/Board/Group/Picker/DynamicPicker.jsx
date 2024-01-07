import { DatePicker } from "./DatePicker";
import { FilePicker } from "./FilePicker";
import { LinkPicker } from "./LinkPicker";
import { MemberPicker } from "./MemberPicker";
import { StatusPicker } from "./StatusPicker";

export function DynamicPicker({ title, task, onUpdate }) {
    switch (title) {
        case "status":
            return <StatusPicker title={title} info={{ chosenOption: task[title] }} onUpdate={onUpdate} />
        case "priority":
            return <StatusPicker title={title} info={{ chosenOption: task[title] }} onUpdate={onUpdate} />
        case "person":
            return <MemberPicker members={task.person} onUpdate={onUpdate} />
        case "date":
            return <DatePicker selectedDate={task.date} onChangeDate={onUpdate} taskId={task.id} />
        case "file":
            return <FilePicker file={task.file} onUpdate={onUpdate} />
        case "link":
            return <LinkPicker info={task.link} onUpdate={onUpdate} taskId={task.id} />
        default:
            return <li>UNKNOWN {title}</li>;
    }
}
