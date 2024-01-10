import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { resetDynamicModal } from "../store/actions/system.actions"
import { ColorPicker } from "./Board/Group/Picker/PickerModals/ColorPicker"
import { MemberPicker } from "./Board/Group/Picker/PickerModals/MemberPicker"
import { LabelPicker } from "./Board/Group/Picker/PickerModals/LabelPicker"
import { DatePicker } from "./Board/Group/Picker/PickerModals/DatePicker"
import { LinkPicker } from "./Board/Group/Picker/PickerModals/LinkPicker"
import { MenuOptionsModal } from "./MenuOptionsModal"
import BoardMemberSelect from "./Board/BoardMemberSelect"
import { FilePicker } from "./Board/Group/Picker/PickerModals/FilePicker"

export function DynamicModal() {
    const modalRef = useRef()
    const modalData = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const [ModalDimensions, setModalDimensions] = useState({ width: 0, height: 0 })
    const [tooltipDirection, setTooltipDirection] = useState('top') // Default direction

    const parentBoundingRect = modalData.parentRefCurrent?.getBoundingClientRect()

    useEffect(() => {
        if (modalRef.current) {
            const modalWidth = modalRef.current.offsetWidth
            const modalHeight = modalRef.current.offsetHeight
            const viewportWidth = window.innerWidth
            const viewportHeight = window.innerHeight

            let newLeft = 0
            let newTop = 0

            if (modalData.isPosBlock) {
                // Position below the parent element
                newTop = parentBoundingRect.bottom

                if (modalData.hasTooltip) {
                    setTooltipDirection('top')
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

                    if (modalData.hasTooltip) {
                        setTooltipDirection('bottom')
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

            setModalDimensions({
                width: modalWidth,
                height: modalHeight,
                left: newLeft,
                top: newTop
            })
        }
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
        left: `${ModalDimensions.left}px`,
        top: `${ModalDimensions.top}px`
    }

    return (
        <div style={style} ref={modalRef} className='dynamic-absolute-modal flex column'>
            {modalData.hasTooltip && (
                <div className={`tooltip tooltip-${tooltipDirection}`}></div>
            )}
            <DynamicModalRouter type={modalData.type} data={modalData.data} />
        </div>
    )
}

function DynamicModalRouter(props) {
    switch (props.type) {
        case 'colorPicker':
            return (
                <ColorPicker
                    colors={props.data.colors}
                    onColorClick={props.data.onColorClick}
                />)

        case 'datePicker':
            return (
                <DatePicker
                    selectedDate={props.data.selectedDate}
                    onChangeDate={props.data.onChangeDate}
                />)

        case 'labelPicker':
            return (
                <LabelPicker
                    selectedStatus={props.data.selectedStatus}
                    title={props.data.title}
                    onChangeStatus={props.data.onUpdate}
                />)

        case 'linkPicker':
            return (
                <LinkPicker
                    url={props.data.url}
                    displayTxt={props.data.displayTxt}
                    changeLink={props.data.onChangeLink}
                />)

        case 'filePicker':
            return (
                <FilePicker
                    chosenFile={props.data.chosenFile}
                    changeFile={props.data.onChangeFile}
                />)

        case 'memberPicker':
            return (
                <MemberPicker
                    chosenMembers={props.data.chosenMembers}
                    allMembers={props.data.allMembers}
                    onChangeMembers={props.data.onChangeMembers}
                />)

        case 'menuOptions':
            return <MenuOptionsModal options={props.data.options} />

        case 'boardMemberSelect':
            return <BoardMemberSelect chosenMember={props.data.chosenMember} members={props.data.members} onChangeMember={props.data.onChangeMember} />
    }
}