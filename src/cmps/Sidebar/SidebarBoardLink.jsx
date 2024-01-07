import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { DeleteIcon, BoardIcon, MenuIcon, PencilIcon } from "../../services/svg.service";
import { removeBoard, updateBoard } from "../../store/actions/board.actions"
import { setDynamicModalOpen } from "../../store/actions/system.actions";
import { MenuOptionsModal } from "../MenuOptionsModal";

export function SidebarBoardLink({ boards, board, currActiveBoard, openModalId }) {
    const [isModalOpen, setisModalOpen] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(board.title)

    useEffect(() => {
        if (openModalId === board._id) setisModalOpen(true)
        else setisModalOpen(false)
    }, [isModalOpen])

    const dispatch = useDispatch()

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

    function onToggleModal() {
        if (openModalId === board._id) {
            // dispatch(setDynamicModalOpen(null))
            setisModalOpen(false)
        } else {
            // dispatch(setDynamicModalOpen(board._id))
            setisModalOpen(true)
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
                            onClick={onToggleModal}
                            title="Board Menu"
                        >
                            <MenuIcon />
                            {isModalOpen && <MenuOptionsModal id={board._id} options={menuOptions} relative={posOptions} />}
                        </button>
                    </>
                )}
            </NavLink>
        </>
    )
}