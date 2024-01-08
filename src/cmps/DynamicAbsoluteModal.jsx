import { useSelector } from "react-redux"
import { ColorPicker } from "./Board/Group/Picker/PickerModals/ColorPicker"
import { MenuOptionsModal } from "./MenuOptionsModal"
import { DatePicker } from "./Board/Group/Picker/PickerModals/DatePicker"
import { StatusPicker } from "./Board/Group/Picker/PickerModals/StatusPicker"
import { LinkPicker } from "./Board/Group/Picker/PickerModals/LinkPicker"
import { MemberPicker } from "./Board/Group/Picker/PickerModals/MemberPicker"

export function DynamicAbsoluteModal() {
    const modalData = useSelector((storeState) => storeState.systemModule.dynamicModal)

    if (!modalData.isOpen) return

    // console.log('modalData.boundingRect', modalData.boundingRect)
    // console.log('modalData.isInline', modalData.isInline)
    console.log('modalData', modalData)

    const isPosBlock = modalData.isPosBlock ? true : false

    console.log('isPosBlock', isPosBlock)
    let style = {
        //centered below father:
        // top: `${modalData.boundingRect.bottom}px`,
        // left: `${modalData.boundingRect.left + (modalData.boundingRect.width / 2) - (modalWidth / 2)}px` 
    }

    if (isPosBlock) { //modal will render top/bottom relative to the clicked father
        style = {
            top: `${modalData.boundingRect.bottom}px`, // directly below father
            left: `${modalData.boundingRect.right - modalData.boundingRect.width}px` // the left of the modal will be the left of the father
        }
    } else { //modal will render left/right relative to the clicked father
        style = {
            top: `${modalData.boundingRect.top}px`, // Aligns the top of the modal with the top of the father
            left: `${modalData.boundingRect.right}px`,
        }
    }


    return (
        <div style={style || {}} className="dynamic-absolute-modal">
            <DynamicModal type={modalData.type} data={modalData.data} />
        </div>
    )
}

function DynamicModal(props) {
    switch (props.type) {
        case 'color picker':
            return <ColorPicker colors={props.data.colors} onColorClick={props.data.onColorClick} />

        case 'date picker':
            return <DatePicker selectedDate={props.data.selectedDate} onChangeDate={props.data.onChangeDate} />

        case 'status picker':
            return <StatusPicker selectedStatus={props.data.selectedStatus} title={props.data.title} onChangeStatus={props.data.onUpdate} />

        case 'link picker':
            return <LinkPicker url={props.data.url} displayTxt={props.data.displayTxt} changeLink={props.data.onChangeLink} />

        case 'member picker':
            return <MemberPicker chosenMembers={props.data.chosenMembers} memberOptions={props.data.memberOptions} onChangeMembers={props.data.onChangeMembers} />

        case 'menu options':
            return <MenuOptionsModal options={props.data.options} />

    }
}