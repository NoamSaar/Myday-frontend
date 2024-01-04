

export function BoardHeader({ board }) {
    return (
        <header className="board-header">
            <div className="info">
                <h3 className="board-title">{board.title}</h3>

                <div className="btn">
                    <img src="../../public/icons/info.svg" />
                </div>

                <div className="btn">
                    <img src="../../public/icons/favorite.svg" />
                </div>

            </div>

            <div className="colleagues">

                <div className="btn invite-container">
                    <img src="../../public/icons/invite.svg" />
                    <span>Invite / 1</span>
                </div>

                <div className="btn">
                    <img src="../../public/icons/menu.svg" />
                </div>

            </div>

            <div className="display-opts">main table +</div>
            <div className="actions">automate</div>

            <div className="filter-sec">
                <div>new task</div>
            </div>
        </header>
    )
}
