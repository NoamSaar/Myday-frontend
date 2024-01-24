import { useNavigate } from "react-router";
import { BoardIcon } from "../../services/svg.service";
import workspaceBoardPreview from "/img/workspace-board-preview.svg"

export function WorkspaceBoardPreview({ board }) {
    const navigate = useNavigate()

    return (
        <article className="workspace-board-preview grid"
            onClick={() => navigate(`/board/${board._id}`)}>
            <img src={workspaceBoardPreview} alt="" />
            <section className="flex align-center">
                <BoardIcon />
                <p className="board-title">{board.title}</p>
            </section>
            <p>work management &gt; Main workspace  </p>
        </article>
    )
}   