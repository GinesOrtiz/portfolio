import React from 'react'
import connect from 'react-redux/es/connect/connect'

import Icon from '../common/Icon'
import { openContextMenu } from '../../actions/contextMenu'

import apps from '../../app/list'
import './menuBar.scss'
import {
  activeWindow,
  createWindow,
  minimizeWindow,
} from '../../actions/windows'

const defaultActiveWindow = {
  title: 'Finder',
}

const MenuBar = ({
  currentWindow,
  windows,
  openContextMenu,
  createWindow,
  activeWindow,
  minimizeWindow,
}) => {
  const systemContextMenu = [
    {
      type: 'button',
      value: 'Ginés Ortiz',
      icon: 'person',
      action: () => {
        const window = apps.about
        const originalWindow = windows.find((win) => win.id === window.id)

        createWindow(window)
        activeWindow(window)

        if (originalWindow && originalWindow.prev) {
          minimizeWindow(window)
        }
      },
    },
  ]

  const onMenuClick = (from, ev) => {
    const position = {
      top: ev.target.offsetTop + ev.target.offsetHeight,
      left: ev.target.offsetLeft,
    }

    ev.preventDefault()
    ev.stopPropagation()

    if (from === 'system') {
      openContextMenu({
        position,
        content: systemContextMenu,
      })
    }
  }

  return (
    <div className={'menu-bar'} onContextMenu={(ev) => ev.preventDefault()}>
      <div
        onClick={(ev) => onMenuClick('system', ev)}
        className={'menu-option system'}
      >
        <Icon type={'layers'} />
      </div>
      <div className={'menu-option app'}>
        <span>{currentWindow.title}</span>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentWindow:
    [...state.windows].find((window) => window.active) || defaultActiveWindow,
  windows: state.windows,
})

const mapDispatchToProps = (dispatch) => ({
  openContextMenu: (config) => dispatch(openContextMenu(config)),
  createWindow: (config) => dispatch(createWindow(config)),
  activeWindow: (config) => dispatch(activeWindow(config)),
  minimizeWindow: (config) => dispatch(minimizeWindow(config)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
