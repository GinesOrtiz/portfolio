import { combineReducers } from 'redux'

import windows from './windows'
import contextMenu from './contextMenu'
import dock from './dock'

export default combineReducers({
  windows,
  contextMenu,
  dock,
})
