import { SET_DYNAMIC_MODAL, SET_DYNAMIC_MODAL_OPEN, SET_DYNAMIC_MODAL_BOUNDING_RECT, SET_DYNAMIC_MODAL_TYPE, SET_DYNAMIC_MODAL_DATA, SET_DYNAMIC_MODAL_FATHER } from '../reducers/system.reducer'
import { store } from '../store'

export function setDynamicModalOpen(isOpen) {
    store.dispatch({ type: SET_DYNAMIC_MODAL_OPEN, isOpen })
}

export function setDynamicModalBoundingRect(dynamicModalBoundingRect) {
    store.dispatch({ type: SET_DYNAMIC_MODAL_BOUNDING_RECT, dynamicModalBoundingRect })
}

export function setDynamicModalType(dynamicModalType) {
    store.dispatch({ type: SET_DYNAMIC_MODAL_TYPE, dynamicModalType })
}

export function setDynamicModalData(dynamicModalData) {
    store.dispatch({ type: SET_DYNAMIC_MODAL_DATA, dynamicModalData })
}

export function setDynamicModalFather(fatherId) {
    store.dispatch({ type: SET_DYNAMIC_MODAL_FATHER, fatherId })
}

export function setDynamicModal(dynamicModal) {
    store.dispatch({ type: SET_DYNAMIC_MODAL, dynamicModal })
}
export function resetDynamicModal() {
    store.dispatch({
        type: SET_DYNAMIC_MODAL, dynamicModal: getEmptyDynamicModal()
    })
}

export function getEmptyDynamicModal() {
    return {
        isOpen: false,
        boundingRect: null,
        type: '',
        data: {},
        fatherId: '',
        isPosBlock: true,
        isCenter: false,
        isTooltip: false,
    }
}