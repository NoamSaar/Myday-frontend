import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { updateBoard } from "../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal, showErrorMsg } from "../../store/actions/system.actions"
import { EditableTxt } from "../EditableTxt"
import { FeedbackIcon } from "../../services/svg.service"

export function InfoModal() {
    const board = useSelector((storeState) => storeState.boardModule.filteredBoard)
    const { parentId, type, isOpen } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const [boardToEdit, setBoardToEdit] = useState(board)
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [isEditingDesc, setIsEditingDesc] = useState(false)

    const titleRef = useRef(null)

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
            setIsEditingTitle(false)
            setIsEditingDesc(false)
        }
    }

    function onStatEnter(txt, name, ref) {
        if ((isOpen && type !== 'tooltip') || isEditingTitle) return

        setDynamicModal(
            {
                isOpen: true,
                parentRefCurrent: ref.current,
                type: 'tooltip',
                data: { txt },
                parentId: `${name}-tooltip`,
                hasCaret: true,
                isCenter: true,
                isPosBlock: true,
                caretClred: true
            })
    }

    function onStatLeave(name) {
        if (parentId === `${name}-tooltip`) resetDynamicModal()
    }

    return (
        <div className="flex info-modal">
            <div className="flex column board-description-container">
                <div
                    className="title-container"
                    ref={titleRef}
                    onMouseEnter={() => onStatEnter('Click to edit', 'header-title', titleRef)}
                    onMouseLeave={() => onStatLeave('header-title')}
                >
                    <EditableTxt
                        isEditing={isEditingTitle}
                        txtValue={boardToEdit.title}
                        onTxtClick={() => setIsEditingTitle(true)}
                        inputValue={boardToEdit.title}
                        inputName={'title'}
                        onInputChange={handleChange}
                        onEditClose={onUpdateBoard}
                    />
                </div>

                <div className="description-container">
                    <EditableTxt
                        isEditing={isEditingDesc}
                        txtValue={boardToEdit.description || 'Add a description here to make sure your team is aligned on the purpose of this board'}
                        onTxtClick={() => setIsEditingDesc(true)}
                        inputValue={boardToEdit.description || ''}
                        inputName={'description'}
                        onInputChange={handleChange}
                        onEditClose={onUpdateBoard}
                    />
                </div>

                <a className="flex align-center svg-inherit-color feedback" href="https://mail.google.com/mail/u/0/?fs=1&to=edenrize@gmail.com,mormarzan@gmail.com,noamsaar11@gmail.com&su=Feedback%20on%20Myday&tf=cm" target="_blank">
                    <FeedbackIcon />
                    <p>Give feedback</p>
                </a>
            </div>

            <div className="flex column board-data-container">

            </div>
        </div>
    )
}
