import { DynamicPicker } from "./DynamicPicker"

export function TaskPreview() {
    return (
        <section className="task-preview">
        </section>
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
