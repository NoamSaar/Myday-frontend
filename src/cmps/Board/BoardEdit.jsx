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

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            onUpdateBoard(ev)
            ev.target.blur()
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
            {/* {!isEditing ?
                <h3 className="title" title="Click to edit" onClick={() => setIsEditing(true)}>
                    {board.title}
                </h3>
                :
                <input className="reset title"
                    title="Click to edit"
                    onChange={handleChange}
                    onBlur={onUpdateBoard}
                    onKeyDown={handleKeyDown}
                    value={title}
                    type="text"
                    name="title"
                    autoFocus
                />
            } */}

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
