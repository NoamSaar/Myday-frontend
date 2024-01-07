import { SET_DYNAMIC_MODAL_OPEN, SET_DYNAMIC_MODAL_BOUNDING_RECT } from '../reducers/system.reducer'

export function setDynamicModalOpen(DynamicModalIsOpen) {
    return {
        type: SET_DYNAMIC_MODAL_OPEN,
        DynamicModalIsOpen,
    };
}

export function setDynamicModalBoundingRect(dynamicModalBoundingRect) {
    return {
        type: SET_DYNAMIC_MODAL_BOUNDING_RECT,
        dynamicModalBoundingRect,
    };
}