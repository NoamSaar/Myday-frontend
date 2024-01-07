import { ColorPickerModal } from "./Board/Group/Picker/PickerModals/ColorPickerModal";
import { MenuOptionsModal } from "./MenuOptionsModal";

export function DynamicAbsoluteModal() {
    const isOpen = useSelector((storeState) => storeState.systemModule.DynamicModalIsOpen)
    const boundingRect = useSelector((storeState) => storeState.systemModule.dynamicModalBoundingRect)
    const type = useSelector((storeState) => storeState.systemModule.dynamicModalType)
    const data = useSelector((storeState) => storeState.systemModule.dynamicModalData)

    return (
        <div className="dynamic-absolute-modal">
            {isOpen && <dynamicModal type={type} data={data} />}
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