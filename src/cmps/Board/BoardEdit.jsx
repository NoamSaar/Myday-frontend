import { useEffect, useState } from "react"
import { updateBoard } from "../../store/actions/board.actions"
import { setisFullSidebarMobile, showErrorMsg } from "../../store/actions/system.actions"
import { EditableTxt } from "../EditableTxt"
import { ArrowLeftIcon, InfoIcon, StarIcon } from "../../services/svg.service"

export function BoardEdit({ board }) {
    const [boardToEdit, setBoardToEdit] = useState(board)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setBoardToEdit(board)
    }, [board])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }
        setBoardToEdit(prevBoard => ({ ...prevBoard, [field]: value }))
    }

    async function onUpdateBoard() {
        try {
            await updateBoard(boardToEdit)
        } catch (err) {
            console.log('Cannot update board', err)
            showErrorMsg('Cannot update Board')
        } finally {
            setIsEditing(false)
        }
    }


    const { title } = boardToEdit

    return (
        <>
            <button className="btn back" onClick={() => setisFullSidebarMobile(true)}>
                <ArrowLeftIcon />
            </button>

            <EditableTxt
                isEditing={isEditing}
                txtValue={board.title}
                onTxtClick={() => setIsEditing(true)}
                inputValue={title}
                inputName={'title'}
                onInputChange={handleChange}
                onEditClose={onUpdateBoard}
            />

            <div className="info-favorite flex align-center">
                <button className="btn info" title="Show board description">
                    <InfoIcon />
                </button>

                <button className="btn favorite" title="Add to favorites">
                    <StarIcon />
                </button>
            </div>
        </>
    )
}


