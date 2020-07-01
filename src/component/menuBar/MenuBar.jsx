import React from 'react'
import connect from 'react-redux/es/connect/connect'
import propTypes from 'prop-types'

import Icon from '../common/Icon'
import { openContextMenu } from '../../actions/contextMenu'
import { openWindow } from '../../actions/windows'

import apps from '../../app/list'
import './menuBar.scss'

const defaultActiveWindow = {
  title: 'Finder',
}

const MenuBar = ({ currentWindow, openContextMenu, openWindow }) => {
  const systemContextMenu = [
    {
      type: 'button',
      value: 'Ginés Ortiz',
      icon: 'person',
      action: () => openWindow(apps.about),
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

MenuBar.propTypes = {
  currentWindow: propTypes.object,
  openContextMenu: propTypes.func.isRequired,
  openWindow: propTypes.func.isRequired,
}

MenuBar.defaultProps = {
  currentWindow: defaultActiveWindow,
}

const mapStateToProps = (state) => ({
  currentWindow:
    [...state.windows].find((window) => window.active) || defaultActiveWindow,
})

const mapDispatchToProps = (dispatch) => ({
  openContextMenu: (config) => dispatch(openContextMenu(config)),
  openWindow: (window) => dispatch(openWindow(window)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
