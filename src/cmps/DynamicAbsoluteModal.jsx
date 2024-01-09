import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

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

    useEffect(() => {
        if (modalRef.current) {
            setModalDimensions({
                width: modalRef.current.offsetWidth,
                height: modalRef.current.offsetHeight
            })
        }
    }, [modalData])

    if (!modalData.isOpen) return

    console.log('ModalDimensions', ModalDimensions)
    const isPosBlock = modalData.isPosBlock || false //if isPosBlock is undefined, put false

    let style = {
        //centered below father:
        // top: `${modalData.boundingRect.bottom}px`,
        // left: `${modalData.boundingRect.left + (modalData.boundingRect.width / 2) - (modalWidth / 2)}px` 
    }

    if (isPosBlock) { // top/bottom relative to the clicked father
        style = {
            top: `${modalData.boundingRect.bottom}px`, // directly below father
            left: `${modalData.boundingRect.left + (modalData.boundingRect.width - ModalDimensions.width) / 2}px` // center modal 
            // left: `${modalData.boundingRect.right - modalData.boundingRect.width}px` // the left of the modal will be the left of the father
        }
    } else { // left/right relative to the clicked father
        style = {
            top: `${modalData.boundingRect.top}px`, // Aligns the top of the modal with the top of the father
            left: `${modalData.boundingRect.right}px`,
        }
    }

    return (
        <div style={style} ref={modalRef} className="dynamic-absolute-modal">
            <DynamicModal type={modalData.type} data={modalData.data} />
        </div>
    )
}

function DynamicModal(props) {
    switch (props.type) {
        case 'color picker':
            return (
                <ColorPicker
                    colors={props.data.colors}
                    onColorClick={props.data.onColorClick}
                />)

        case 'date picker':
            return (
                <DatePicker
                    selectedDate={props.data.selectedDate}
                    onChangeDate={props.data.onChangeDate}
                />)

        case 'status picker':
            return (
                <StatusPicker
                    selectedStatus={props.data.selectedStatus}
                    title={props.data.title}
                    onChangeStatus={props.data.onUpdate}
                />)

        case 'link picker':
            return (
                <LinkPicker
                    url={props.data.url}
                    displayTxt={props.data.displayTxt}
                    changeLink={props.data.onChangeLink}
                />)

        case 'member picker':
            return (
                <MemberPicker
                    chosenMembers={props.data.chosenMembers}
                    memberOptions={props.data.memberOptions}
                    onChangeMembers={props.data.onChangeMembers}
                />)

        case 'menu options':
            return <MenuOptionsModal options={props.data.options} />

        case 'board member select':
            return <BoardMemberSelect chosenMember={props.data.chosenMember} members={props.data.members} onChangeMember={props.data.onChangeMember} />
    }
}