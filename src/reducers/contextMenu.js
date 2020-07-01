import { ContextMenu } from '../actions/contextMenu'

const defaultState = {
  active: false,
  content: [],
}

const contextMenu = (state = defaultState, action) => {
  switch (action.type) {
    case ContextMenu.OPEN_CONTEXT:
      return {
        ...state,
        ...action.config,
        active: true,
      }
    case ContextMenu.CLOSE_CONTEXT:
      return {
        ...state,
        active: false,
      }
    default:
      return state
  }
}

export default contextMenu
