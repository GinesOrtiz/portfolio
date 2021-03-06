import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import Window from '../window/Window'
import Dock from '../dock/Dock'
import MenuBar from '../menuBar/MenuBar'
import { windowInteraction } from './utils/windows'
import {
  updateWindow,
  activeWindow,
  createWindow,
  openWindow,
} from '../../actions/windows'
import { closeContextMenu, openContextMenu } from '../../actions/contextMenu'
import ContextMenu from '../contextMenu/ContextMenu'
import { closeDock } from '../../actions/dock'
import apps from '../../app/list'

import './desktop.scss'

const Desktop = ({
  updateWindow,
  activeWindow,
  createWindow,
  openWindow,
  openContextMenu,
  closeContextMenu,
  closeDock,
  windows,
}) => {
  const [isActiveWindow, setIsActiveWindow] = useState({})

  const desktopContextMenu = Object.values(apps).map((app) => ({
    value: app.title,
    icon: app.icon,
    action: () => openWindow(app),
  }))

  const onMouseDown = (ev, window, src) => {
    const activePos = windows.findIndex((win) => win.id === window.id)
    const newActiveWindow = {
      ...windows[activePos],
      src,
      pos: activePos,
      layerX: ev.nativeEvent.layerX,
      layerY: ev.nativeEvent.layerY,
      clientX: ev.nativeEvent.clientX,
      clientY: ev.nativeEvent.clientY,
      window: {
        width: windows[activePos].width,
        height: windows[activePos].height,
      },
    }

    activeWindow(window)
    updateWindow(window, { ...newActiveWindow, active: true })
    setIsActiveWindow(newActiveWindow)
  }

  const onMouseMove = (ev) => {
    const windowConfig = windowInteraction(
      isActiveWindow,
      { transition: null },
      ev
    )

    if (windowConfig) {
      updateWindow(isActiveWindow, windowConfig)
    }
  }

  const onMouseUp = () => {
    setIsActiveWindow({})
  }

  const onContextMenu = (ev) => {
    ev.preventDefault()
    openContextMenu({
      position: {
        top: ev.clientY,
        left: ev.clientX,
      },
      content: desktopContextMenu,
    })
  }

  useEffect(() => {
    setTimeout(() => {
      const params = new URLSearchParams(document.location.search.substring(1))
      const appParam = params.get('app')
      const app = apps[appParam] || apps.about

      createWindow(app)
      activeWindow(app)
    }, 1000)
  }, [createWindow])

  return (
    <div
      className={'desktop'}
      onClick={closeContextMenu}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <MenuBar />
      <div onContextMenu={onContextMenu} className={'desktop-layer'}>
        <div
          className={'desktop-back'}
          onClick={() => {
            activeWindow({})
            closeDock({})
          }}
        />
        {windows.map((window, pos) => (
          <Window windowPos={pos} key={window.id} onMouseDown={onMouseDown} />
        ))}
      </div>
      <Dock />
      <ContextMenu />
    </div>
  )
}

Desktop.propTypes = {
  windows: propTypes.array.isRequired,
  updateWindow: propTypes.func.isRequired,
  activeWindow: propTypes.func.isRequired,
  createWindow: propTypes.func.isRequired,
  openWindow: propTypes.func.isRequired,
  openContextMenu: propTypes.func.isRequired,
  closeContextMenu: propTypes.func.isRequired,
  closeDock: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  windows: state.windows,
})

const mapDispatchToProps = (dispatch) => ({
  updateWindow: (window, data) => dispatch(updateWindow(window, data)),
  activeWindow: (window) => dispatch(activeWindow(window)),
  createWindow: (window) => dispatch(createWindow(window)),
  openWindow: (window) => dispatch(openWindow(window)),
  openContextMenu: (config) => dispatch(openContextMenu(config)),
  closeContextMenu: () => dispatch(closeContextMenu()),
  closeDock: () => dispatch(closeDock()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Desktop)
