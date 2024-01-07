import { SET_DYNAMIC_MODAL_OPEN, SET_DYNAMIC_MODAL_BOUNDING_RECT, SET_DYNAMIC_MODAL_TYPE, SET_DYNAMIC_MODAL_DATA } from '../reducers/system.reducer'

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

export function setDynamicModalType(dynamicModalType) {
    return {
        type: SET_DYNAMIC_MODAL_TYPE,
        dynamicModalType,
    };
}

export function setDynamicModalData(dynamicModalData) {
    return {
        type: SET_DYNAMIC_MODAL_DATA,
        dynamicModalData,
    };
}