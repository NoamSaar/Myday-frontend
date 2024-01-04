import { MemberPicker } from "./MemberPicker";
import { StatusPicker } from "./StatusPicker";

export function DynamicPicker({ title, task, onUpdate }) {
    switch (title) {
        case "Status":
        case "Priority":
            return <StatusPicker title={title} info={{ chosenOption: task[title.toLowerCase()] }} onUpdate={onUpdate} />
        case "person":
            return <MemberPicker members={task.person} onUpdate={onUpdate} />
        default:
            return <li>UNKNOWN {title}</li>;
    }
}
