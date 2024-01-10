import { GroupTitlesList } from "./GroupTitlesList";

export function TaskHeaderList({ groupColor, titlesOrder }) {
    return (
        <div className="task-header-list-container">


            <ul className="clean-list task-header-list sticky-left">
                <div className="task-title-sticky flex sticky-left">
                    <div className="task-row-placeholder sticky-left"></div>
                    <div style={{ backgroundColor: groupColor }} className="color-display sticky-left-36"></div>

                    <div className="task-title-container">
                        <li className="task-selection">
                            <input type="checkbox" />
                        </li>

                        <li className="task-title">Task</li>
                    </div>
                </div>

                <div className="titles-content">
                    <GroupTitlesList titles={titlesOrder} />
                    <li className="line-end"></li>
                </div>
            </ul>
        </div>
    )
}
