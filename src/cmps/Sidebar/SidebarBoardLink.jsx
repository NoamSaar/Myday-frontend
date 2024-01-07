import { useState } from "react";
import { useNavigate } from "react-router";

import { DeleteIcon, BoardIcon, MenuIcon, PencilIcon } from "../../services/svg.service";
import { setDynamicModal } from "../../store/actions/system.actions";
import { useSelector } from "react-redux";

export function SidebarBoardLink({ board, currActiveBoard, deleteBoard, renameBoard }) {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(board.title)
    const [lastClickedBoardId, setLastClickedBoardId] = useState(null)

    const navigate = useNavigate()

    async function onDeleteBoard() {
        deleteBoard(board._id)
    }

    async function onRenameBoard() {
        renameBoard(board, editedTitle)
        setIsEditing(false)
    }

    function toggleMenu(ev) {
        ev.stopPropagation()
        const newBoardId = ev.currentTarget.getAttribute('data-boardid')
        setLastClickedBoardId(newBoardId)

        if (isMenuOpen) {
            //updating modal in store
            setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {} })
            setIsMenuOpen(false)
        } else {
            //updating modal in store
            setDynamicModal({
                isOpen: true,
                boundingRect: ev.target.getBoundingClientRect(),
                type: 'menu options',
                data: { options: menuOptions }
            })
            setIsMenuOpen(true)
        }
    }

    const handleInputKeyDown = (ev) => {
        // Check if the pressed key is Enter (key code 13)
        if (ev.key === 'Enter') {
            onRenameBoard()
        }
    }

    function highlightText(text, query) {
        if (!query) return text
        const parts = text.split(new RegExp(`(${query})`, 'gi'))
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase()
                ? <span key={index} className="highlight">{part}</span>
                : part
        )
    }

    const menuOptions = [
        {
            icon: <DeleteIcon />,
            title: 'Delete',
            onOptionClick: () => {
                onDeleteBoard()
                setIsMenuOpen(false)
                setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {} })
            }
        },
        {
            icon: <PencilIcon />,
            title: 'Rename Board',
            onOptionClick: () => {
                onRenameBoard()
                setIsEditing(!isEditing)
                setIsMenuOpen(false)
                setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {} })
            }
        }
    ]

    const style = { position: 'relative' }

    const dynActiveNavClass = currActiveBoard && currActiveBoard._id === board._id ? 'active' : ''
    const dynHoverNavClass = lastClickedBoardId === board._id && isMenuOpen ? 'hovered' : '';
    const dynModalClass = isMenuOpen ? 'active' : ''

    if (!boards && !boards.length) return <div>Loading board...</div>
    return (
        <>
            <div className={`grid btn btn-board-nav ${dynActiveNavClass} ${dynHoverNavClass}`}
                onClick={() => navigate(`/board/${board._id}`)}
                title={`${board.title} Board`}
            >
                <BoardIcon />
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(ev) => setEditedTitle(ev.target.value)}
                        onBlur={onRenameBoard}
                        onKeyDown={handleInputKeyDown}
                        autoFocus
                    />
                ) : (
                    <>
                        <span>{highlightText(board.title, filterBy.title)}</span>

                        <button
                            className={`btn btn-option-menu ${dynModalClass}`}
                            style={style}
                            alt="Board Menu"
                            onClick={toggleMenu}
                            title="Board Menu"
                            data-boardid={board._id}
                        >
                            <MenuIcon />
                        </button>
                    </>
                )}
            </div>
        </>
    )
}