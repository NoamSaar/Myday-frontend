import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuOptionsModal } from "../MenuOptionsModal";
import { removeBoard, updateBoard } from "../../store/actions/board.actions"


export function SidebarBoardLink({ board, isActive }) {
    const [isModalOpen, setisModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(board.title)
    const navigate = useNavigate()

    function onOpenModal() {
        setisModalOpen(!isModalOpen)
    }

    async function onDeleteBoard() {
        try {
            await removeBoard(board._id)
            navigate('board/b101')
        } catch (error) {
            console.error("Error removing task:", error)
        }
    }

    async function onRenameBoard() {
        try {
            await updateBoard({ ...board, title: editedTitle })
            navigate('board/b101')
        } catch (error) {
            console.error("Error removing task:", error)
        } finally {
            setIsEditing(false)
        }
    }

    const menuOptions = [
        {
            icon: '../../../public/icons/delete.svg',
            title: 'Delete',
            onOptionClick: onDeleteBoard
        },
        {
            icon: '../../../public/icons/Pencil.svg',
            title: 'Rename Board',
            onOptionClick: () => {
                setIsEditing(!isEditing)
                setisModalOpen(false)
            }
        }
    ]

    // const posOptions = ['left', 'top', '30px', '145px']
    const posOptions = {
        dirInline: 'left',
        dirBlock: 'top',
        diffInline: '30px',
        diffBlock: '145px'
    }

    const style = { position: 'relative' }

    return (
        <section>
            <NavLink className={`btn ${isActive ? 'active' : ''}`}
                to={`/board/${board._id}`}
                title={`${board.title} Board`}>
                <img src="../../public/icons/Board.svg" alt="home-icon" />
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
                        <img
                            style={style}
                            className="btn btn-option-menu"
                            src="../../public/icons/menu.svg"
                            alt="Board Menu"
                            onClick={onOpenModal}
                        />
                        {isModalOpen && <MenuOptionsModal options={menuOptions} relative={posOptions} />}
                    </>
                )}
            </NavLink>

        </section>

    )
}