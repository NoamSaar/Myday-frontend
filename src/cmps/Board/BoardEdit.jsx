import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { updateBoard } from "../../store/actions/board.actions"
import { resetDynamicModal, setDynamicDialog, setDynamicModal, setDynamicModalData, setIsFullSidebarMobile, showErrorMsg } from "../../store/actions/system.actions"
import { EditableTxt } from "../EditableTxt"
import { ArrowLeftIcon, FilledStarIcon, InfoIcon, StarIcon } from "../../services/svg.service"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { InfoModal } from "./InfoModal"

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

    useEffectUpdate(() => {
        onUpdateBoard()
    }, [boardToEdit.isStarred])

    function onStatEnter(txt, name, ref) {
        if (isOpen && type !== 'tooltip') return
        // if (isOpen && parentId === 'favorite-title-tooltip') return

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

    function onStarClick() {
        setBoardToEdit(prevBoard => ({ ...prevBoard, isStarred: !prevBoard.isStarred }))
        setDynamicModalData({ txt: boardToEdit.isStarred ? 'Add to favorites' : 'Remove from favorites' })
    }

    function onInfoClick() {
        setDynamicDialog({
            isOpen: true,
            contentCmp: <InfoModal />
        })
    }


    const { title } = boardToEdit
    const favoriteTooltip = boardToEdit.isStarred ? 'Remove from favorites' : 'Add to favorites'

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

            <div className="info-favorite flex align-center">
                <button
                    className="btn info"
                    ref={infoRef}
                    onMouseEnter={() => onStatEnter('Show board description', 'info-title', infoRef)}
                    onMouseLeave={() => onStatLeave('info-title')}
                    onClick={onInfoClick}
                >
                    <InfoIcon />
                </button>

                <button
                    className={`btn ${boardToEdit.isStarred && 'starred svg-inherit-color'} favorite`}
                    ref={favoriteRef}
                    onMouseEnter={() => onStatEnter(favoriteTooltip, 'favorite-title', favoriteRef)}
                    onMouseLeave={() => onStatLeave('favorite-title')}
                    onClick={onStarClick}
                >
                    {boardToEdit.isStarred ? <FilledStarIcon /> : <StarIcon />}
                </button>
            </div>
        </>
    )
}


