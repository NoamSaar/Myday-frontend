
export default function DynamicSummary({ title, group }) {
    switch (title) {

        // case "status":
        // case "priority":
        //     return (
        //         <LabelPreview
        //             title={title}
        //             info={{ chosenOption: task[title] }}
        //             onUpdate={onUpdate}
        //             taskId={task.id}
        //         />)

        case "member":
            return (
                <li></li>)

        // case "date":
        //     return (
        //         <DatePreview
        //             selectedDate={task.date}
        //             onChangeDate={onUpdate}
        //             taskId={task.id}
        //         />)

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
