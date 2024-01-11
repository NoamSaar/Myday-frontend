import { getEmptyDynamicModal } from "../actions/system.actions"

export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_MSG = 'SET_MSG'

export const SET_DYNAMIC_MODAL_OPEN = 'SET_DYNAMIC_MODAL_OPEN'
export const SET_DYNAMIC_MODAL_PARENT_REF = 'SET_DYNAMIC_MODAL_PARENT_REF'
export const SET_DYNAMIC_MODAL_TYPE = 'SET_DYNAMIC_MODAL_TYPE'
export const SET_DYNAMIC_MODAL_DATA = 'SET_DYNAMIC_MODAL_DATA'
export const SET_DYNAMIC_MODAL_PARENT = 'SET_DYNAMIC_MODAL_PARENT'
export const SET_DYNAMIC_MODAL = 'SET_DYNAMIC_MODAL'
export const SET_DYNAMIC_PANEL_OPEN = 'SET_DYNAMIC_PANEL_OPEN'
export const SET_DYNAMIC_PANEL_TYPE = 'SET_DYNAMIC_PANEL_TYPE'
export const SET_DYNAMIC_PANEL_DATA = 'SET_DYNAMIC_PANEL_DATA'
export const SET_SIDE_PANEL_OPEN = 'SET_SIDE_PANEL_OPEN'

const initialState = {
  isLoading: false,
  msg: null,
  dynamicModal: getEmptyDynamicModal(),
  isSidePanelOpen: false,
  slidePanelData: {
    isPanelOpen: false,
    type: '',
    data: {}
  }
}

export function systemReducer(state = initialState, action = {}) {
  // console.log('action:', action)
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    case SET_MSG:
      return { ...state, msg: action.msg }

    case SET_DYNAMIC_MODAL:
      return { ...state, dynamicModal: action.dynamicModal }

    case SET_DYNAMIC_MODAL_OPEN:
      return { ...state, dynamicModal: { ...state.dynamicModal, isOpen: action.isOpen } }

    case SET_DYNAMIC_MODAL_PARENT_REF:
      return { ...state, dynamicModal: { ...state.dynamicModal, parentRefCurrent: action.dynamicModalParentRefCurrent } }

    case SET_DYNAMIC_MODAL_TYPE:
      return { ...state, dynamicModal: { ...state.dynamicModal, type: action.dynamicModalType } }

    case SET_DYNAMIC_MODAL_PARENT:
      return { ...state, dynamicModal: { ...state.dynamicModal, parentId: action.parentId } }

    case SET_DYNAMIC_MODAL_DATA:
      return { ...state, dynamicModal: { ...state.dynamicModal, data: action.dynamicModalData } }


    // PANEL
    case SET_SIDE_PANEL_OPEN:
      return { ...state, isSidePanelOpen: action.isSidePanelOpen }

    case SET_DYNAMIC_PANEL_OPEN:
      return {
        ...state, slidePanelData: {
          ...state.slidePanelData,
          isPannelOpen: action.isPanelOpen,
        }
      }

    case SET_DYNAMIC_PANEL_TYPE:
      return {
        ...state, slidePanelData: {
          ...state.slidePanelData,
          type: action.type,
        }
      }

    case SET_DYNAMIC_PANEL_DATA:
      return {
        ...state, slidePanelData: {
          ...state.slidePanelData,
          data: action.data,
        }
      }
    default: return state
  }
}
