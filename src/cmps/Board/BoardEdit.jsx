import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { updateBoard } from "../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal, setIsFullSidebarMobile, showErrorMsg } from "../../store/actions/system.actions"
import { EditableTxt } from "../EditableTxt"
import { ArrowLeftIcon, InfoIcon, StarIcon } from "../../services/svg.service"

export function BoardEdit({ board }) {
    const [boardToEdit, setBoardToEdit] = useState(board)
    const [isEditing, setIsEditing] = useState(false)

    const { parentId, type, isOpen } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const titleRef = useRef(null)
    const favoriteRef = useRef(null)
    const infoRef = useRef(null)

    useEffect(() => {
        setBoardToEdit(board)
    }, [board])

    function onStatEnter(txt, name, ref) {
        if (isOpen && type !== 'tooltip') return

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
            <button className="back" onClick={() => setIsFullSidebarMobile(true)}>
                <ArrowLeftIcon />
            </button>

            <div
                ref={titleRef}
                onMouseEnter={() => onStatEnter('Click to edit', 'header-title', titleRef)}
                onMouseLeave={() => onStatLeave('header-title')}
            >
                <EditableTxt
                    isEditing={isEditing}
                    txtValue={board.title}
                    onTxtClick={() => setIsEditing(true)}
                    inputValue={title}
                    inputName={'title'}
                    onInputChange={handleChange}
                    onEditClose={onUpdateBoard}
                />
            </div>

            {/* <div className="info-favorite flex align-center">
                <button
                    className="btn info"
                    // title="Show board description"
                    ref={infoRef}
                    onMouseEnter={() => onStatEnter('Show board description', 'info-title', infoRef)}
                    onMouseLeave={() => onStatLeave('info-title')}
                >
                    <InfoIcon />
                </button>

                <button
                    className="btn favorite"
                    // title="Add to favorites"
                    ref={favoriteRef}
                    onMouseEnter={() => onStatEnter('Add to favorites', 'favorite-title', favoriteRef)}
                    onMouseLeave={() => onStatLeave('favorite-title')}
                >
                    <StarIcon />
                </button>
            </div> */}
        </>
    )
}


