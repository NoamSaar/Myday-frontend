import { DynamicPicker } from "./DynamicPicker"

export function TaskPreview({ task, titlesOrder }) {
    return (
        <ul className="clean-list task-preview" key={task.id}>
            <li>{task.title}</li>

            {titlesOrder.map((title, idx) => {
                console.log('title', title)
                console.log('task[title]', task[title.toLowerCase()])
                return <DynamicPicker key={idx} title={title} task={task} />
                return <DynamicPicker key={idx} title={title} info={{ chosenOption: task[title.toLowerCase()] }} />
            })}
        </ul>
    )
}

// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//         "status-picker",
//         "member-picker",
//         "date-picker",
//         "priority-picker",
//     ]
//     return (
//         <section>
//             <h5>{task.txt}</h5>
//             {cmpsOrder.map((cmp, idx) => {
//                 return (
//                     <DynamicPicker
//                         cmp={cmp}
//                         key={idx}
//                         onUpdate={(data) => {
//                             console.log("Updating: ", cmp, "with data:", data)
//                             // make a copy, update the task, create an action
//                             // Call action: updateTask(task, action)
//                         }}
//                     />
//                 )
//             })}
//         </section>
//     )
// }
