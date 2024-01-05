import { useSelector } from "react-redux"
import { TaskPreview } from "./TaskPreview"

export function TaskList({ groupId }) {
    const board = useSelector((storeState) => storeState.boardModule.currBoard)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    let group = board.groups[groupIdx]


    return (
        <ul className="clean-list task-list">


            {group.tasks.map(task => {
                return <TaskPreview key={task.id} task={task} groupId={groupId} />
            })}

            <ul className="clean-list task-preview-container add-task">

                <ul className="clean-list task-preview">
                    <div className="sticky-left-36 task-title-container">
                        <li className="task-selection">
                            <input disabled type="checkbox" />
                        </li>
                        <li className="task-title single-task">+ Add task</li>
                    </div>



                    <div className="line-end"></div>
                </ul>
            </ul>
            {/* 
            <ul className="clean-list task-preview-container sticky-left">
                <ul className="clean-list task-preview add-task">
                    <div className="task-title-container">
                        <li className="task-selection">
                            <input disabled type="checkbox" />
                        </li>
                        <li className="task-title single-task">+ Add task</li>
                    </div>


                    <div className="line-end"></div>
                </ul>
            </ul> */}


        </ul>

        // </ul>

    )
}
