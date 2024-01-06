import { SET_OPEN_MODAL } from '../reducers/system.reducer'

export function setOpenModal(modalId) {
    return {
        type: SET_OPEN_MODAL,
        modalId,
    };
}