import { SET_DYNAMIC_MODAL, SET_DYNAMIC_MODAL_OPEN, SET_DYNAMIC_MODAL_BOUNDING_RECT, SET_DYNAMIC_MODAL_TYPE, SET_DYNAMIC_MODAL_DATA, SET_DYNAMIC_MODAL_FATHER, SET_IS_LOADING } from '../reducers/system.reducer'
import { SET_MSG } from '../reducers/system.reducer.js'
import { store } from '../store'

// Loading
export function setIsLoading(isLoading) {
    store.dispatch({ type: SET_IS_LOADING, isLoading })
}

// msg
export function showSuccessMsg(txt) {
    store.dispatch({ type: SET_MSG, msg: { type: 'success', txt } })
}

export function showErrorMsg(txt) {
    store.dispatch({ type: SET_MSG, msg: { type: 'error', txt } })
}

export function setMsg(msg) {
    store.dispatch({ type: SET_MSG, msg })
}

// modal
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
        isCenter: true,
        isTooltip: false,
    }
}