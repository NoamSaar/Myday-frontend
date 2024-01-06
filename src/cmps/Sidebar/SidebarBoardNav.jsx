import { SidebarBoardLink } from "./SidebarBoardLink";

export function SidebarBoardNav({ boards, isActive, currActiveBoard }) {
    return (
        <nav className="sidebar-board-nav">
            {boards.map(board => (
                <SidebarBoardLink
                    boards={boards}
                    key={board._id}
                    board={board}
                    isActive={isActive}
                    currActiveBoard={currActiveBoard} />
            ))}
        </nav>
    )
}