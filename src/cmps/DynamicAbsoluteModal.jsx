import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { resetDynamicModal } from "../store/actions/system.actions"
import { ColorPicker } from "./Board/Group/Picker/PickerModals/ColorPicker"
import { MemberPicker } from "./Board/Group/Picker/PickerModals/MemberPicker"
import { StatusPicker } from "./Board/Group/Picker/PickerModals/StatusPicker"
import { DatePicker } from "./Board/Group/Picker/PickerModals/DatePicker"
import { LinkPicker } from "./Board/Group/Picker/PickerModals/LinkPicker"
import { MenuOptionsModal } from "./MenuOptionsModal"
import BoardMemberSelect from "./Board/BoardMemberSelect"

export function DynamicAbsoluteModal() {
    const modalRef = useRef()
    const modalData = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const [ModalDimensions, setModalDimensions] = useState({ width: 0, height: 0 })
    const [tooltipDirection, setTooltipDirection] = useState('top') // Default direction

    useEffect(() => {
        if (modalRef.current) {
            const modalWidth = modalRef.current.offsetWidth
            const modalHeight = modalRef.current.offsetHeight
            const viewportWidth = window.innerWidth
            const viewportHeight = window.innerHeight

            let newLeft = 0
            let newTop = 0

            if (modalData.isPosBlock) {
                // Position below the father element
                newTop = modalData.boundingRect.bottom

                if (modalData.hasTooltip) {
                    setTooltipDirection('top')
                }

                if (modalData.isCenter) {
                    // Center horizontally relative to the father element
                    newLeft = modalData.boundingRect.left + (modalData.boundingRect.width - modalWidth) / 2
                } else {
                    newLeft = modalData.boundingRect.left
                }

                // Check if modal goes out of the bottom boundary of the viewport and adjust
                if (newTop + modalHeight > viewportHeight) {
                    newTop = modalData.boundingRect.top - modalHeight

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
                // Position to the right of the father element
                newLeft = modalData.boundingRect.right
                newTop = modalData.boundingRect.top

                // Check and adjust for right viewport boundary
                if (newLeft + modalWidth > viewportWidth) {
                    newLeft = modalData.boundingRect.left - modalWidth
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
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                resetDynamicModal()
                // console.log('closinc by dynamic modal')
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [modalRef])

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
            <DynamicModal type={modalData.type} data={modalData.data} />
        </div>
    )
}

function DynamicModal(props) {
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

        case 'statusPicker':
            return (
                <StatusPicker
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

        case 'memberPicker':
            return (
                <MemberPicker
                    chosenMembers={props.data.chosenMembers}
                    memberOptions={props.data.memberOptions}
                    onChangeMembers={props.data.onChangeMembers}
                />)

        case 'menuOptions':
            return <MenuOptionsModal options={props.data.options} />

        case 'boardMemberSelect':
            return <BoardMemberSelect chosenMember={props.data.chosenMember} members={props.data.members} onChangeMember={props.data.onChangeMember} />
    }
}