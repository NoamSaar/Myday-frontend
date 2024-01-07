import { useState } from "react";
import { useNavigate } from "react-router";

import { DeleteIcon, BoardIcon, MenuIcon, PencilIcon } from "../../services/svg.service";
import { setDynamicModal } from "../../store/actions/system.actions";
import { useSelector } from "react-redux";

export function SidebarBoardLink({ board, currActiveBoard, deleteBoard, renameBoard }) {
    const boards = useSelector((storeState) => storeState.boardModule.boards)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(board.title)
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
                setIsEditing(!isEditing)
                setIsMenuOpen(false)
                setDynamicModal({ isOpen: false, boundingRect: null, type: '', data: {} })
            }
        }
    ]

    const style = { position: 'relative' }

    const dynNavClass = currActiveBoard && currActiveBoard._id === board._id ? 'active' : ''
    const dynModalClass = isMenuOpen ? 'active' : ''

    if (!boards && !boards.length) return <div>Loading board...</div>
    return (
        <>
            <div className={`btn ${dynNavClass}`}
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
                        autoFocus
                    />
                ) : (
                    <>
                        <span>{board.title}</span>

                        <button
                            className={`btn btn-option-menu relative ${dynModalClass}`}
                            style={style}
                            alt="Board Menu"
                            onClick={toggleMenu}
                            title="Board Menu"
                        >
                            <MenuIcon />
                        </button>
                    </>
                )}
            </div>
        </>
    )
}