import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { resetDynamicModal } from "../store/actions/system.actions"
import { DynamicModalRouter } from "./DynamicModalRouter"

export function DynamicModal() {
    const modalRef = useRef()
    const modalData = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const [ModalPos, setModalPos] = useState({ left: 0, top: 0 })
    const [caretDirection, setCaretDirection] = useState('top') // Default direction

    const parentBoundingRect = modalData.parentRefCurrent?.getBoundingClientRect()

    useEffect(() => {
        if (!modalRef.current) return

        const modalWidth = modalRef.current.offsetWidth
        const modalHeight = modalRef.current.offsetHeight
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let newLeft = 0
        let newTop = 0

        if (modalData.isPosBlock) {
            // Position below the parent element
            newTop = parentBoundingRect.bottom

            if (modalData.hasCaret) {
                setCaretDirection('top')
            }

            if (modalData.isCenter) {
                // Center horizontally relative to the parent element
                newLeft = parentBoundingRect.left + (parentBoundingRect.width - modalWidth) / 2
            } else {
                newLeft = parentBoundingRect.left
            }

            // Check if modal goes out of the bottom boundary of the viewport and adjust
            if (newTop + modalHeight > viewportHeight) {
                newTop = parentBoundingRect.top - modalHeight

                if (modalData.hasCaret) {
                    setCaretDirection('bottom')
                }
            }

            // Check and adjust for left/right viewport boundaries
            if (newLeft + modalWidth > viewportWidth) {
                newLeft = viewportWidth - modalWidth
            }
            newLeft = Math.max(0, newLeft)
        } else {
            // Position to the right of the parent element
            newLeft = parentBoundingRect.right
            newTop = parentBoundingRect.top

            // Check and adjust for right viewport boundary
            if (newLeft + modalWidth > viewportWidth) {
                newLeft = parentBoundingRect.left - modalWidth
            }

            // Check and adjust for top/bottom viewport boundaries
            if (newTop + modalHeight > viewportHeight) {
                newTop = viewportHeight - modalHeight
            }
            newTop = Math.max(0, newTop)
        }

        setModalPos({
            left: newLeft,
            top: newTop
        })

    }, [modalData])

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)
                && modalData.parentRefCurrent && !modalData.parentRefCurrent.contains(event.target)
            ) {
                resetDynamicModal()
                // console.log('closing by dynamic modal')
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [modalRef, modalData])

    if (!modalData.isOpen) return

    const style = {
        left: `${ModalPos.left}px`,
        top: `${ModalPos.top}px`
    }

    return (
        <div style={style} ref={modalRef} className='dynamic-absolute-modal flex column'>
            {modalData.hasCaret && (
                <div className={`caret caret-${caretDirection} ${modalData.caretClred && 'colored'}`}></div>
            )}
            <DynamicModalRouter type={modalData.type} data={modalData.data} />
        </div>
    )
}