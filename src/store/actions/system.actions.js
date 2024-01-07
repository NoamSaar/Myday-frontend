import { SET_DYNAMIC_OPEN_MODAL } from '../reducers/system.reducer'

export function setOpenModal(isDynamicModalOpen) {
    return {
        type: SET_DYNAMIC_OPEN_MODAL,
        isDynamicModalOpen,
    };
}