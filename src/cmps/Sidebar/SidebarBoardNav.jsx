import { SidebarBoardLink } from "./SidebarBoardLink";

export function SidebarBoardNav({ boards, onToggleIsActive, isActive }) {
    return (
        <nav className="sidebar-board-nav">
            {boards.map(board => (
                <SidebarBoardLink
                    key={board._id}
                    id={board._id}
                    title={board.title}
                    isActive={isActive}
                    onToggleIsActive={onToggleIsActive} />
            ))}
        </nav>
    )
}