
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_DYNAMIC_MODAL_OPEN = 'SET_DYNAMIC_MODAL_OPEN'
export const SET_DYNAMIC_MODAL_BOUNDING_RECT = 'SET_DYNAMIC_MODAL_BOUNDING_RECT'
export const SET_DYNAMIC_MODAL_TYPE = 'SET_DYNAMIC_MODAL_TYPE'
export const SET_DYNAMIC_MODAL_DATA = 'SET_DYNAMIC_MODAL_DATA'

const initialState = {
  isLoading: false,
  DynamicModalIsOpen: false,
  dynamicModalBoundingRect: null,
  dynamicModalType: '',
  dynamicModalData: {},
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    case SET_DYNAMIC_MODAL_OPEN:
      return { ...state, isDynamicModalOpen: action.isOpen }

    case SET_DYNAMIC_MODAL_BOUNDING_RECT:
      return { ...state, dynamicModalBoundingRect: action.dynamicModalBoundingRect }

    case SET_DYNAMIC_MODAL_TYPE:
      return { ...state, dynamicModalType: action.dynamicModalType }

    case SET_DYNAMIC_MODAL_DATA:
      return { ...state, dynamicModalData: action.dynamicModalData }

    default: return state
  }
}
