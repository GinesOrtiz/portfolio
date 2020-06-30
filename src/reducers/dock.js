import { Dock } from '../actions/dock'

const defaultSate = {
  open: false,
}

const dock = (state = defaultSate, action) => {
  const newState = { ...state }

  switch (action.type) {
    case Dock.OPEN_DOCK:
      newState.open = true

      return newState
    case Dock.CLOSE_DOCK:
      newState.open = false

      return newState
    default:
      return state
  }
}

export default dock
