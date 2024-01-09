import { useEffect, useState } from "react"
import { updateBoard } from "../../store/actions/board.actions"
import { showErrorMsg } from "../../store/actions/system.actions"
import { EditableSpan } from "../EditableSpan"

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

            <EditableSpan
                isEditing={isEditing}
                spanValue={board.title}
                onSpanClick={() => setIsEditing(true)}
                inputValue={title}
                inputName={'title'}
                onInputChange={handleChange}
                onEditClose={onUpdateBoard}
            />

            <div className="info-favorite flex align-center">
                <button className="btn info" title="Show board description">
                    <img src="../../public/icons/info.svg" alt="Info-icon" />
                </button>

                <button className="btn favorite" title="Add to favorites">
                    <img src="../../public/icons/favorite.svg" alt="Star-icon" />
                </button>
            </div>
        </>
    )
}
