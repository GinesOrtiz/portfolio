import React, { useState } from 'react'
import { connect } from 'react-redux'

import Window from '../window/Window'
import Dock from '../dock/Dock'
import MenuBar from '../menuBar/MenuBar'
import { windowInteraction } from './utils/windows'
import {
  updateWindow,
  activeWindow,
  createWindow,
  minimizeWindow,
} from '../../actions/windows'
import { closeContextMenu, openContextMenu } from '../../actions/contextMenu'
import ContextMenu from '../contextMenu/ContextMenu'
import { closeDock } from '../../actions/dock'
import apps from '../../app/list'

import './desktop.scss'
import Icon from '../common/Icon'

const Desktop = (props) => {
  const [activeWindow, setActiveWindow] = useState({})

  const desktopContextMenu = [
    {
      type: 'button',
      value: 'text',
      icon: 'layers',
    },
    {
      type: 'button',
      value: 'demo2',
      icon: 'lens',
    },
  ]

  const onMouseDown = (ev, window, src) => {
    const windows = [...props.windows]
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

    props.activeWindow(window)
    props.updateWindow(window, { ...newActiveWindow, active: true })
    setActiveWindow(newActiveWindow)
  }

  const onMouseMove = (ev) => {
    const windowConfig = windowInteraction(
      activeWindow,
      { transition: null },
      ev
    )

    if (windowConfig) {
      props.updateWindow(activeWindow, windowConfig)
    }
  }

  const onMouseUp = () => {
    setActiveWindow({})
  }

  const onContextMenu = (ev) => {
    const position = {
      top: ev.clientY,
      left: ev.clientX,
    }

    ev.preventDefault()
    props.openContextMenu({ position, content: desktopContextMenu })
  }

  const onOpenApp = (window) => {
    const originalWindow = props.windows.find((win) => win.id === window.id)

    props.createWindow(window)
    props.activeWindow(window)

    if (originalWindow && originalWindow.prev) {
      props.minimizeWindow(window)
    }
  }

  return (
    <div
      className={'desktop'}
      onClick={props.closeContextMenu}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <MenuBar />
      <div onContextMenu={onContextMenu} className={'desktop-layer'}>
        <div
          className={'desktop-back'}
          onClick={() => {
            props.activeWindow({})
            props.closeDock({})
          }}
        />
        <div className={'desktop-apps'}>
          {Object.values(apps).map((app, appIndex) => (
            <div
              key={app.id}
              className={'desktop-app'}
              onClick={() => onOpenApp(app)}
            >
              <Icon type={app.icon || 'extension'} />
              <span>{app.title}</span>
            </div>
          ))}
        </div>
        {props.windows.map((window, pos) => (
          <Window windowPos={pos} key={window.id} onMouseDown={onMouseDown} />
        ))}
      </div>
      <Dock />
      <ContextMenu />
    </div>
  )
}

const mapStateToProps = (state) => ({
  windows: state.windows,
})

const mapDispatchToProps = (dispatch) => ({
  updateWindow: (window, data) => dispatch(updateWindow(window, data)),
  activeWindow: (window) => dispatch(activeWindow(window)),
  createWindow: (window) => dispatch(createWindow(window)),
  minimizeWindow: (window) => dispatch(minimizeWindow(window)),
  openContextMenu: (config) => dispatch(openContextMenu(config)),
  closeContextMenu: () => dispatch(closeContextMenu()),
  closeDock: () => dispatch(closeDock()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Desktop)
