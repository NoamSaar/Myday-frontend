import { useEffect, useState } from "react"
import { DynamicPicker } from "./DynamicPicker"
import { getUser } from "../store/actions/user.actions"
import { utilService } from "../services/util.service";

export function TaskPreview({ task, titlesOrder }) {
    const [currTask, setCurrTask] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const newPersons = [];
            let date = task.date
            try {

                if (task.person.length) {
                    for (const person of task.person) {
                        const loadedUser = await getUser(person);
                        newPersons.push(loadedUser.imgUrl || loadedUser.fullname);
                    }
                }

                if (task.date) {
                    date = utilService.getFormatDate(task.date)
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
            finally {
                setCurrTask({ ...task, person: newPersons, date });
            }
        };

        fetchData();
    }, []);


    if (!currTask) return <ul>Loading</ul>
    return (
        <ul className="clean-list task-preview" key={currTask.id}>
            <li className="task-title">{currTask.title}</li>

            {titlesOrder.map((title, idx) => {
                return <DynamicPicker key={idx} title={title} task={currTask} />
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
