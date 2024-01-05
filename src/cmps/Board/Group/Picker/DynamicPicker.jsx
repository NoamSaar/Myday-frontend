import { DatePicker } from "./DatePicker";
import { FilePicker } from "./FilePicker";
import { LinkPicker } from "./LinkPicker";
import { MemberPicker } from "./MemberPicker";
import { StatusPicker } from "./StatusPicker";

export function DynamicPicker({ title, task, onUpdate }) {
    switch (title) {
        case "Status":
            return <StatusPicker title={title} info={{ chosenOption: task[title.toLowerCase()] }} onUpdate={onUpdate} />
        case "Priority":
            return <StatusPicker title={title} info={{ chosenOption: task[title.toLowerCase()] }} onUpdate={onUpdate} />
        case "Person":
            return <MemberPicker members={task.person} onUpdate={onUpdate} />
        case "Date":
            return <DatePicker date={task.date} onUpdate={onUpdate} />
        case "File":
            return <FilePicker file={task.file} onUpdate={onUpdate} />
        case "Link":
            return <LinkPicker info={task.link} onUpdate={onUpdate} />
        default:
            return <li>UNKNOWN {title}</li>;
    }
}
