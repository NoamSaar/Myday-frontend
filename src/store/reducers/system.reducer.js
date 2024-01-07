export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_DYNAMIC_OPEN_MODAL = 'SET_DYNAMIC_OPEN_MODAL'

const initialState = {
  isLoading: false,
  isDynamicModalOpen: false,
  boundingRect: null
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }

    case LOADING_DONE:
      return { ...state, isLoading: false }

    case SET_DYNAMIC_OPEN_MODAL:
      return { ...state, isDynamicModalOpen: action.isOpen }

    default: return state
  }
}
