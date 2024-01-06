import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuOptionsModal } from "../MenuOptionsModal";
import { removeBoard, updateBoard } from "../../store/actions/board.actions"
import { DeleteIcon, BoardIcon, MenuIcon, PencilIcon } from "../../services/svg.service";

export function SidebarBoardLink({ boards, board, isActive, currActiveBoard }) {
    const [isModalOpen, setisModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(board.title)
    const navigate = useNavigate()

    async function onDeleteBoard() {
        try {
            await removeBoard(board._id)
            // navigate('board/b101')
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    async function onRenameBoard() {
        try {
            await updateBoard({ ...board, title: editedTitle })
        } catch (error) {
            console.error("Error removing task:", error)
        } finally {
            setIsEditing(false)
        }
    }

    function onOpenModal(ev) {
        setisModalOpen(!isModalOpen)
    }

    const handleBlur = (ev) => {
        // Check if the blur target is not the button before closing the modal
        if (!ev.currentTarget.contains(ev.relatedTarget)) {
            setisModalOpen(false);
        }
    }

    const menuOptions = [
        {
            icon: <DeleteIcon />,
            title: 'Delete',
            onOptionClick: onDeleteBoard
        },
        {
            icon: <PencilIcon />,
            title: 'Rename Board',
            onOptionClick: () => {
                setIsEditing(!isEditing)
                setisModalOpen(false)
            }
        }
    ]

    // const posOptions = ['left', 'top', '30px', '145px']
    const posOptions = {
        left: '0',
        right: 0,
        top: '28px',
        button: 0,
    }

    const style = { position: 'relative' }
    const dynNavClass = currActiveBoard && currActiveBoard._id === board._id ? 'active' : ''
    const dynModalClass = isModalOpen ? 'active' : ''
    if (!boards && !boards.length) return <div>Loading board...</div>
    return (
        <>
            <NavLink className={`btn ${dynNavClass}`}
                to={`/board/${board._id}`}
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
                            onClick={onOpenModal}
                            title="Board Menu"
                            onBlur={handleBlur}
                        >
                            <MenuIcon />
                            {isModalOpen && <MenuOptionsModal options={menuOptions} relative={posOptions} />}
                        </button>
                    </>
                )}
            </NavLink>
        </>
    )
}