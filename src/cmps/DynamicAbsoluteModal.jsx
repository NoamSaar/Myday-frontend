import { useSelector } from "react-redux"

import { ColorPicker } from "./Board/Group/Picker/PickerModals/ColorPicker"
import { MemberPicker } from "./Board/Group/Picker/PickerModals/MemberPicker"
import { StatusPicker } from "./Board/Group/Picker/PickerModals/StatusPicker"
import { DatePicker } from "./Board/Group/Picker/PickerModals/DatePicker"
import { LinkPicker } from "./Board/Group/Picker/PickerModals/LinkPicker"
import { MenuOptionsModal } from "./MenuOptionsModal"

export function DynamicAbsoluteModal() {
    const modalData = useSelector((storeState) => storeState.systemModule.dynamicModal)
    let style

    console.log('modalData.boundingRect', modalData.boundingRect)
    if (modalData.isOpen) {
        style = {
            // top: `${modalData.boundingRect.bottom}px`,
            // left: `${modalData.boundingRect.left + (modalData.boundingRect.width / 2) - (200 / 2)}px`
            top: `${modalData.boundingRect.bottom}px`,
            left: `${modalData.boundingRect.right - modalData.boundingRect.width}px`
        }
    }

    return (
        <div style={style || {}} className={`${modalData.isOpen && 'open-dynamic-modal'} dynamic-absolute-modal`}>
            {modalData.isOpen && <DynamicModal type={modalData.type} data={modalData.data} />}
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
    }
}