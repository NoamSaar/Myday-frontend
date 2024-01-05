import { SidebarBoardLink } from "./SidebarBoardLink";

export function SidebarBoardNav({ boards, isActive }) {
    console.log('board:', boards)

    return (
        <nav className="sidebar-board-nav">
            {boards.map(board => (
                < SidebarBoardLink
                    key={board._id}
                    board={board}
                    isActive={isActive} />
            ))}
        </nav>
    )
}