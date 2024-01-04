import { useEffect, useState } from "react"
import { DynamicPicker } from "./DynamicPicker"
import { getUser } from "../store/actions/user.actions"
import { utilService } from "../services/util.service";
import { MenuOptionsModal } from "./MenuOptionsModal";
import { removeTask } from "../store/actions/board.actions";
import { useSelector } from "react-redux";

export function TaskPreview({ task }) {
    const [currTask, setCurrTask] = useState(null)
    const board = useSelector((storeState) => storeState.boardModule.currBoard)

    useEffect(() => {
        const fetchData = async () => {
            const newPersons = []
            let date = task.date
            try {

                if (task.person.length) {
                    for (const person of task.person) {
                        const loadedUser = await getUser(person)
                        newPersons.push(loadedUser.imgUrl || loadedUser.fullname)
                    }
                }

                if (task.date) {
                    date = utilService.getFormatDate(task.date)
                }

                setCurrTask({ ...task, person: newPersons, date })
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

    function onDeleteTask() {
        removeTask(board._id, currTask.id)
    }

    const menuOptions = [
        {
            icon: '../../../public/icons/delete.svg',
            title: 'Delete',
            onOptionClick: onDeleteTask
        }
    ]


    if (!currTask) return <ul>Loading</ul>
    return (
        <ul className="clean-list task-preview-container sticky-left">
            <div className="menu-container">
                <MenuOptionsModal options={menuOptions} />
                <img className="btn" src="../../../public/icons/menu.svg" />
            </div>
            <ul className="clean-list task-preview" key={currTask.id}>

                <div className="sticky-left task-title-container">

                    <li className="task-selection">
                        <input type="checkbox" />
                    </li>

                    <li className="task-title">{currTask.title}</li>
                </div>

                {board.titlesOrder.map((title, idx) => {
                    return <DynamicPicker key={idx} title={title} task={currTask} />
                })}
            </ul>
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
