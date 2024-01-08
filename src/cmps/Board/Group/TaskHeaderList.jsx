import { GroupTitlesList } from "./GroupTitlesList";

export function TaskHeaderList({ groupColor, titlesOrder }) {
    return (
        <div className="task-header-list-container sticky-left">

            <div className="task-row-placeholder sticky-left"></div>

            <ul className="clean-list task-header-list sticky-left-36">
                <div style={{ backgroundColor: groupColor }} className="color-display sticky-left-36"></div>

                <div className="task-title-container">
                    <li className="task-selection">
                        <input type="checkbox" />
                    </li>

                    <li className="task-title">Task</li>
                </div>

                <GroupTitlesList titles={titlesOrder} />
                <li className="line-end"></li>
            </ul>
        </div>
    )
}
