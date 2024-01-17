import { WorkspaceAside } from '../cmps/WorkspaceAside'
import { AngleDownIcon } from '../services/svg.service'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
import workspaceHeaderConfetti from '/img/workspaceHeaderConfetti.svg'
export function Workspace() {
    const loggedInUser = userService.getLoggedinUser()

    return (
        <section className="workspace-page">
            <div className="welcome-header">
                <div className="titles-container">
                    <div className="first-title">{utilService.getBlessingByTime()}, {loggedInUser ? loggedInUser.fullname : 'Guest'}!</div>
                    <div className="second-title">Quickly access your recent boards, Inbox and workspaces</div>
                </div>
                <img src={workspaceHeaderConfetti} alt="confetti" />
            </div>

            <div className="content-container">
                <div className="boards-container">
                    <div className="collapsible-header-wrapper flex align-center">
                        <button title="Collapse Header" className="arrow-container flex svg-inherit-color">
                            <AngleDownIcon />
                        </button>
                        <p>Recently visited</p>
                    </div>

                    {/* <section className="collapsible-content">
                        {toggleBoardList && <BoardList boards={boards} />}
                    </section>

                    <div className="collapsible-header-wrapper">
                        <Icon iconType={Icon.type.SVG} icon={toggleInbox ? DropdownChevronDown : DropdownChevronRight}
                            iconSize={18} onClick={() => setToggleInbox((prevToggle => !prevToggle))} />
                        <Text
                            weight="bold"
                            align="start"
                            element="span"
                        >
                            Update feed (inbox)
                        </Text>
                        <Counter count={0} />
                    </div> */}
                </div>

                <WorkspaceAside />
            </div>
        </section >
    )
}