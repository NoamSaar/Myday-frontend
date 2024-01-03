import { Outlet } from "react-router";
import { BoardGroup } from "../cmps/BoardGroup";

export function BoardDetails() {
    return (
        <section className="board-details">
            <h2>I'm board details</h2>
            <BoardGroup />
            <Outlet />
            {/* the outlet is to display the nested route- task details */}
        </section>
    )
}
