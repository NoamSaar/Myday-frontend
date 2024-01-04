import { useEffect, useState } from "react"
import { DynamicPicker } from "./DynamicPicker"
import { getUser } from "../store/actions/user.actions"

export function TaskPreview({ task, titlesOrder }) {
    const [currTask, setCurrTask] = useState(task)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currTask.person.length) {
                    const newPersons = [];
                    for (const person of currTask.person) {
                        const loadedUser = await getUser(person);
                        newPersons.push(loadedUser.imgUrl || loadedUser.fullname);
                    }
                    setCurrTask(prevCurrTask => ({ ...prevCurrTask, person: newPersons }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


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
