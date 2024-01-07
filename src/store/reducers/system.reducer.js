
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_DYNAMIC_MODAL_OPEN = 'SET_DYNAMIC_MODAL_OPEN'
export const SET_DYNAMIC_MODAL_BOUNDING_RECT = 'SET_DYNAMIC_MODAL_BOUNDING_RECT'
export const SET_DYNAMIC_MODAL_TYPE = 'SET_DYNAMIC_MODAL_TYPE'
export const SET_DYNAMIC_MODAL_DATA = 'SET_DYNAMIC_MODAL_DATA'
export const SET_DYNAMIC_MODAL_FATHER = 'SET_DYNAMIC_MODAL_FATHER'
export const SET_DYNAMIC_MODAL = 'SET_DYNAMIC_MODAL'

const initialState = {
  isLoading: false,
  dynamicModal: { isOpen: false, boundingRect: null, type: '', data: {}, fatherId: '' }
  // DynamicModalIsOpen: false,
  // dynamicModalBoundingRect: null,
  // dynamicModalType: '',
  // dynamicModalData: {},
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    case SET_DYNAMIC_MODAL:
      return { ...state, dynamicModal: action.dynamicModal }

    case SET_DYNAMIC_MODAL_OPEN:
      return { ...state, dynamicModal: { ...state.dynamicModal, isOpen: action.isOpen } }

    case SET_DYNAMIC_MODAL_BOUNDING_RECT:
      return { ...state, dynamicModal: { ...state.dynamicModal, boundingRect: action.dynamicModalBoundingRect } }

    case SET_DYNAMIC_MODAL_TYPE:
      return { ...state, dynamicModal: { ...state.dynamicModal, type: action.dynamicModalType } }

    case SET_DYNAMIC_MODAL_FATHER:
      return { ...state, dynamicModal: { ...state.dynamicModal, fatherId: action.fatherId } }

    case SET_DYNAMIC_MODAL_DATA:
      return { ...state, dynamicModal: { ...state.dynamicModal, data: action.dynamicModalData } }

    default: return state
  }
}
