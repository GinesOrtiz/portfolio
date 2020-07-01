export const ContextMenu = {
  OPEN_CONTEXT: 'OPEN_CONTEXT',
  CLOSE_CONTEXT: 'CLOSE_CONTEXT',
}

export const openContextMenu = (config) => ({
  type: ContextMenu.OPEN_CONTEXT,
  config,
})

export const closeContextMenu = () => ({
  type: ContextMenu.CLOSE_CONTEXT,
})
