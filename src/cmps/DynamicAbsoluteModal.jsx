import { ColorPickerModal } from "./Board/Group/Picker/PickerModals/ColorPickerModal";
import { MenuOptionsModal } from "./MenuOptionsModal";

export function DynamicAbsoluteModal({ type, data, ev }) {

    return (
        <div className="dynamic-absolute-modal">
            <dynamicModal type={type} data={data} />
        </div>
    )
}

function dynamicModal(props) {
    switch (props.type) {
        case 'color picker':
            return <ColorPickerModal colors={props.data.colors} onColorClick={props.data.onColorClick} />

        case 'menu options':
            return <MenuOptionsModal options={props.data.options} />

    }
}