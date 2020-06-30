export const Dock = {
  OPEN_DOCK: 'OPEN_DOCK',
  CLOSE_DOCK: 'CLOSE_DOCK',
}

export const openDock = () => ({
  type: Dock.OPEN_DOCK,
})

export const closeDock = () => ({
  type: Dock.CLOSE_DOCK,
})
