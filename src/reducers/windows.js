import { Windows } from '../actions/windows'
import { transition, windowSize } from '../component/desktop/utils/windows'

import apps from '../app/list'

const menuBarHeight = 24
const dockHeight = 40

const defaultSate = []
let start

const step = (timestamp) => {
  if (start === undefined) start = timestamp
  const elapsed = timestamp - start

  if (elapsed < 300) {
    window.requestAnimationFrame(step)
  }
}

const createWindow = (newState, action) => {
  if (!newState.find((window) => window.id === action.window.id)) {
    const windowWidth = window.innerWidth / 2
    const windowHeight = window.innerHeight / 2 - 20

    window.requestAnimationFrame(step)

    newState.push({
      ...windowSize,
      x: windowWidth - action.window.width / 2,
      y: windowHeight - action.window.height / 2,
      ...action.window,
      createdAt: +new Date(),
    })
  }

  return newState
}

const activeWindow = (newState, action, currentWindow) => {
  const activeWindow = newState.splice(currentWindow, 1)[0]

  if (activeWindow) {
    newState.push(activeWindow)

    return newState.map((window) => ({
      ...window,
      active: window.id === action.window.id,
    }))
  }

  return newState
}

const fullScreenWindow = (newState, currentWindow) => {
  window.requestAnimationFrame(step)

  if (newState[currentWindow].prev) {
    newState[currentWindow] = {
      ...newState[currentWindow].prev,
      transition,
    }
  } else {
    newState[currentWindow] = {
      ...newState[currentWindow],
      x: 0,
      y: menuBarHeight,
      width: window.innerWidth,
      height: window.innerHeight - menuBarHeight - dockHeight,
      transition,
      prev: { ...newState[currentWindow] },
    }
  }

  return newState
}

const updateWindow = (newState, action, currentWindow) => {
  if (newState[currentWindow]) {
    newState[currentWindow] = {
      ...newState[currentWindow],
      ...action.data,
    }
  }

  return newState
}

const deleteWindow = (newState, currentWindow) => {
  newState.splice(currentWindow, 1)

  return newState
}

const minimizeWindow = (newState, currentWindow) => {
  const appInDock = document
    .querySelector(`.dock-button[data-app="${newState[currentWindow].id}"]`)
    .getBoundingClientRect()

  window.requestAnimationFrame(step)

  newState[currentWindow].transition = 'all .3s ease-in-out'
  newState[currentWindow].styles = {
    transform: 'scale(1)',
    transformOrigin: 'top left',
  }

  if (newState[currentWindow].prev) {
    newState[currentWindow] = newState[currentWindow].prev
  } else {
    newState[currentWindow].prev = { ...newState[currentWindow] }
    newState[currentWindow] = {
      ...newState[currentWindow],
      x: appInDock.x,
      y: appInDock.y,
      styles: {
        pointerEvents: 'none',
        transform: 'scale(.3)',
        transformOrigin: 'top left',
        opacity: 0,
      },
    }
  }

  return newState
}

const openWindow = (newState, action, currentWindow) => {
  const window = apps[action.window.id]

  if (window) {
    const originalWindow = newState.find((win) => win.id === action.window.id)

    newState = createWindow(newState, { window })
    newState = activeWindow(newState, { window }, currentWindow)

    if (originalWindow && originalWindow.prev) {
      minimizeWindow(newState, currentWindow)
    }
  }

  return newState
}

const windows = (state = defaultSate, action) => {
  const newState = [...state]
  const currentWindow = action.window
    ? newState.findIndex((window) => window.id === action.window.id)
    : -1

  switch (action.type) {
    case Windows.CREATE_WINDOW:
      return createWindow(newState, action)
    case Windows.ACTIVE_WINDOW:
      return activeWindow(newState, action, currentWindow)
    case Windows.FULLSCREEN_WINDOW:
      return fullScreenWindow(newState, currentWindow)
    case Windows.UPDATE_WINDOW:
      return updateWindow(newState, action, currentWindow)
    case Windows.DELETE_WINDOW:
      return deleteWindow(newState, currentWindow)
    case Windows.MINIMIZE_WINDOW:
      return minimizeWindow(newState, currentWindow)
    case Windows.OPEN_WINDOW:
      return openWindow(newState, action, currentWindow)
    default:
      return state
  }
}

export default windows
