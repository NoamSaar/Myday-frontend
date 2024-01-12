import { BoardGroup } from "./BoardGroup";

export function GroupList({ board, isFocusLastGroup, onSetIsFocusLastGroup }) {
    return (
        <ul className="group-list">
            {board.groups.map((group, idx) =>
                <BoardGroup
                    key={group.id}
                    group={group}
                    titlesOrder={board.titlesOrder}
                    isEditingTitle={isFocusLastGroup && idx === board.groups.length - 1}
                    onTitleEditLeave={onSetIsFocusLastGroup}
                />)}
        </ul>
    )
}
