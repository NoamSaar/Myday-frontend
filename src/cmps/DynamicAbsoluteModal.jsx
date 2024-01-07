import { useSelector } from "react-redux";
import { ColorPickerModal } from "./Board/Group/Picker/PickerModals/ColorPickerModal";
import { MenuOptionsModal } from "./MenuOptionsModal";

export function DynamicAbsoluteModal() {
    const modalData = useSelector((storeState) => storeState.systemModule.dynamicModal)
    let style
    console.log('modalData.boundingRect', modalData.boundingRect)

    if (modalData.isOpen) {
        style = {
            top: `${modalData.boundingRect.bottom + 5}px`,
            left: `${modalData.boundingRect.right + 10}px`
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

        case 'menu options':
            return <MenuOptionsModal options={props.data.options} />

    }
}