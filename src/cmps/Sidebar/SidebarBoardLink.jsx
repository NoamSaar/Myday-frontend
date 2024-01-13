import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"

import { DeleteIcon, BoardIcon, MenuIcon, PencilIcon } from "../../services/svg.service"
import { resetDynamicModal, setDynamicModal, setIsLoading, setIsMobileHP } from "../../store/actions/system.actions"
import { setCurrBoard } from "../../store/actions/board.actions"

export function SidebarBoardLink({ board, boards, currActiveBoard, removeBoard, updateBoard }) {
    const { boardId } = useParams()
    const menuBtnRef = useRef(null)

    const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(board.title)
    const [lastClickedBoardId, setLastClickedBoardId] = useState(null)

    const navigate = useNavigate()

    const isMenuOpen = parentId === `${board._id}-sidebar-menu`

    async function onRemoveBoard() {
        removeBoard(board._id)
    }

    async function onUpdateBoard() {
        updateBoard(board, editedTitle)
        setIsEditing(false)
    }

    function toggleMenu(ev) {
        ev.stopPropagation()
        const newBoardId = ev.currentTarget.getAttribute('data-boardid')
        setLastClickedBoardId(newBoardId)

        if (isMenuOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                parentRefCurrent: menuBtnRef.current,
                parentId: `${board._id}-sidebar-menu`,
                type: 'menuOptions',
                data: { options: menuOptions },
                isPosBlock: true
            })
        }
    }

    const handleInputKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            onUpdateBoard()
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

    function onLinkClick() {
        setIsMobileHP(false)
        if (boardId === board._id) return
        setIsLoading(true)
        setCurrBoard(null)
        navigate(`/board/${board._id}`)
        // resetDynamicModal()
    }

    const menuOptions = [
        {
            icon: <DeleteIcon />,
            title: 'Delete',
            onOptionClick: () => {
                onRemoveBoard()
                resetDynamicModal()
            }
        },
        {
            icon: <PencilIcon />,
            title: 'Rename Board',
            onOptionClick: () => {
                onUpdateBoard()
                setIsEditing(!isEditing)
                resetDynamicModal()
            }
        }
    ]

    const style = { position: 'relative' }

    const dynActiveNavClass = currActiveBoard && currActiveBoard._id === board._id ? 'active' : ''
    const dynHoverNavClass = lastClickedBoardId === board._id && isMenuOpen ? 'hovered' : ''
    const dynModalClass = isMenuOpen ? 'active' : ''

    if (!boards && !boards.length) return <div>Loading board...</div>
    return (
        <>
            <div className={`grid btn btn-board-nav ${dynActiveNavClass} ${dynHoverNavClass}`}
                onClick={onLinkClick}
                title={`${board.title} Board`}
            >
                <BoardIcon />
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(ev) => setEditedTitle(ev.target.value)}
                        onBlur={onUpdateBoard}
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
                            ref={menuBtnRef}
                        >
                            <MenuIcon />
                        </button>
                    </>
                )}
            </div>
        </>
    )
}