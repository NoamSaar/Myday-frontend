import { GroupTitlesList } from "../GroupTitlesList";

export function TaskHeaderList({ groupColor, titlesOrder }) {
    return (
        <div className="task-header-list-container subgrid full-grid-column">

            <ul className="clean-list task-header-list sticky-left subgrid full-grid-column">
                <div className="task-title-sticky flex sticky-left">
                    <div className="task-row-placeholder sticky-left"></div>
                    <div style={{ backgroundColor: groupColor }} className="color-display sticky-left-36"></div>

                    <div className="task-title-container">
                        <li className="task-selection">
                            <div className="checkbox"></div>
                        </li>

                        <li className="task-title">Task</li>
                    </div>
                </div>

                <div className="subgrid grid-column-table-content">
                    <GroupTitlesList titles={titlesOrder} />
                    <li className="line-end"></li>
                </div>
            </ul>
        </div>
    )
}
