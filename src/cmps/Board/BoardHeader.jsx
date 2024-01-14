import { useEffect, useRef, useState } from "react"

import { BoardFilter } from "./BoardFilter"
import { BoardEdit } from "./BoardEdit"
import { HomeIcon, InviteIcon, PlusIcon, RobotIcon, MenuIcon, AngleDownIcon } from "../../services/svg.service"
import { setIsHeaderCollapsed } from "../../store/actions/board.actions"
import { useNavigate } from "react-router"
import { setSidePanelOpen } from "../../store/actions/system.actions"
import { DynamicDialog } from "../DynamicDialog"
import { InviteModal } from "./InviteModal"

export function BoardHeader({ board, filterBy, onSetFilter }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
    const sentinelRef = useRef(null) //since the header is alway sticky, there was a need of static element to detect going outside the viewport
    const navigate = useNavigate()

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const currIsCollapsed = !entry.isIntersecting
                setIsCollapsed(currIsCollapsed)
                setIsHeaderCollapsed(currIsCollapsed)
            },
            {
                root: null, // null means the viewport
                rootMargin: '0px',
                threshold: 0,
            }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current)
            }
        }
    }, [])

    function onCollapseHeader() {
        const currIsCollapsed = !isCollapsed
        setIsCollapsed(currIsCollapsed)
        setIsHeaderCollapsed(currIsCollapsed)
    }

    const dynCollapsedClass = isCollapsed ? 'collapsed' : ''
    return (
        <>
            <div ref={sentinelRef} className="header-sentinel"></div>

            <header className={"board-header " + dynCollapsedClass}>

                <BoardEdit board={board} />

                <button className="activities btn"
                    onClick={() => {
                        setSidePanelOpen(true)
                        navigate('activity_log')
                    }}
                >
                    <span>Activity</span>
                </button>

                <div className="invite-more-bts flex align-center">
                    <button className="btn invite" onClick={() => setIsInviteDialogOpen(true)}>
                        <InviteIcon />
                        <span>Invite / 1</span>
                    </button>

                    <button className="btn more" title="Options">
                        <MenuIcon />
                    </button>
                </div>

                <div className="display-opts flex align-center">
                    <button className="btn main-table" title="Main Table">
                        <HomeIcon />
                        <span>Main Table</span>
                    </button>

                    <button className="btn add-view svg-inherit-color" title="Add view">
                        <PlusIcon />
                    </button>
                </div>

                <div className="actions flex align-center">
                    <button className="btn automate">
                        <RobotIcon />
                        <span>Automate</span>
                    </button>

                    <button className={dynCollapsedClass + ' btn collapse'}
                        title="Collapse header"
                        onClick={onCollapseHeader}
                    >
                        <AngleDownIcon />
                    </button>
                </div>

                <BoardFilter
                    board={board}
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                />
                {isInviteDialogOpen && <DynamicDialog dialogContentComponent={<InviteModal board={board} />} onCloseDialog={() => setIsInviteDialogOpen(false)} />}
            </header>
        </>
    )
}
