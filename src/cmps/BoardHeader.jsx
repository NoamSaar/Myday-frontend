

export function BoardHeader({ board }) {
    return (
        <header className="board-header">
            <div className="board-header-top-container">
                <div className="board-title-info-container">

                    <h1>
                        {board.title}
                    </h1>
                    <div className="btn-container">
                        <img src="../../public/icons/info.svg" />
                    </div>
                    <div className="btn-container">
                        <img src="../../public/icons/favorite.svg" />
                    </div>
                </div>

                <div className="board-header-actions">

                    <div className="btn-container invite-container">
                        <img src="../../public/icons/invite.svg" /> <p>Invite / 1</p>
                    </div>

                    <div className="btn-container">
                        <img src="../../public/icons/menu.svg" />
                    </div>

                </div>
            </div>
        </header>
    )
}
