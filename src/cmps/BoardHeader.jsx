import { useState } from "react"


export function BoardHeader({ board }) {

    const [isCollapsed, setIsCollapsed] = useState(false)

    function onCollapseHeader() {
        setIsCollapsed(!isCollapsed)
    }

    const dynCollapsedClass = isCollapsed ? 'collapsed' : ''

    return (
        <header className={dynCollapsedClass + ' board-header'}>

            <h3 className="title" title="Click to edit">{board.title}</h3>

            <div className="info-favorite flex align-center">
                <button className="btn info" title="Show board description">
                    <img src="../../public/icons/info.svg" alt="Info-icon" />
                </button>
                <button className="btn favorite" title="Add to favorites">
                    <img src="../../public/icons/favorite.svg" alt="Star-icon" />
                </button>
            </div>

            <button className="activities btn">
                <span>Activity</span>
            </button>

            <div className="invite-more-bts flex align-center">
                <button className="btn invite">
                    <img src="../../public/icons/invite.svg" alt="Add-person-icon" />
                    <span>Invite / 1</span>
                </button>
                <button className="btn more" title="Options">
                    <img src="../../public/icons/menu.svg" alt="More-icon" />
                </button>
            </div>

            <div className="display-opts flex align-center">
                <button className="btn main-table" title="Main Table">
                    <img src="../../public/icons/Home.svg" alt="Home-icon" />
                    <span>Main Table</span>
                </button>
                <button className="btn add-view" title="Add view">
                    <img src="../../public/icons/AddSmallNormalClr.svg" alt="Add-icon" />
                </button>
            </div>

            <div className="actions flex align-center">
                <button className="btn automate">
                    <img src="../../public/icons/Robot.svg" alt="Robot-icon" />
                    <span>Automate</span>
                </button>
                <button className={dynCollapsedClass + ' btn collapse'} title="Collapse header" onClick={onCollapseHeader}>
                    <img src="../../public/icons/DropdownChevronDown.svg" alt="Dropdown-icon" />
                </button>
            </div>


            <div className="filter-sec">
                <button className="btn new-task">New Task</button>
            </div>
        </header>
    )
}
