import { useSelector } from "react-redux";
import { ColorPickerModal } from "./Board/Group/Picker/PickerModals/ColorPickerModal";
import { MenuOptionsModal } from "./MenuOptionsModal";
import { DatePickerModal } from "./Board/Group/Picker/PickerModals/DatePickerModal";
import { StatusPickerModal } from "./Board/Group/Picker/PickerModals/StatusPickerModal";
import { LinkPickerModal } from "./Board/Group/Picker/PickerModals/LinkPickerModal";

export function DynamicAbsoluteModal() {
    const modalData = useSelector((storeState) => storeState.systemModule.dynamicModal)
    let style

    if (modalData.isOpen) {
        style = {
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
            return <ColorPickerModal colors={props.data.colors} onColorClick={props.data.onColorClick} />

        case 'date picker':
            return <DatePickerModal selectedDate={props.data.selectedDate} onChangeDate={props.data.onChangeDate} />

        case 'status picker':
            return <StatusPickerModal selectedStatus={props.data.selectedStatus} title={props.data.title} onChangeStatus={props.data.onUpdate} />

        case 'link picker':
            return <LinkPickerModal url={props.data.url} displayTxt={props.data.displayTxt} changeLink={props.data.onChangeLink} />

        case 'menu options':
            return <MenuOptionsModal options={props.data.options} />

    }
}