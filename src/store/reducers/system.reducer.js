export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_OPEN_MODAL = 'SET_OPEN_MODAL'

const initialState = {
  isLoading: false,
  openModalId: null,
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }

    case LOADING_DONE:
      return { ...state, isLoading: false }

    case SET_OPEN_MODAL:
      return { ...state, openModalId: action.modalId }

    default: return state
  }
}
