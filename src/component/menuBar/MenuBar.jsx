import React from 'react'
import connect from 'react-redux/es/connect/connect'

import Icon from '../common/Icon'
import { openContextMenu } from '../../actions/contextMenu'
import './menuBar.scss'

const MenuBar = (props) => {
  const defaultActiveWindow = {
    title: 'Finder',
  }

  const systemContextMenu = [
    {
      type: 'button',
      value: 'Ginés Ortiz',
      icon: 'person',
    },
  ]

  const onMenuClick = (from, ev) => {
    const position = {
      top: ev.target.offsetTop + ev.target.offsetHeight,
      left: ev.target.offsetLeft,
    }

    ev.preventDefault()
    ev.stopPropagation()
    switch (from) {
      case 'system':
        props.openContextMenu({
          position,
          content: systemContextMenu,
        })
    }
  }

  const activeWindow = props.activeWindow || defaultActiveWindow

  return (
    <div className={'menu-bar'} onContextMenu={(ev) => ev.preventDefault()}>
      <div
        onClick={(ev) => onMenuClick('system', ev)}
        className={'menu-option system'}
      >
        <Icon type={'layers'} />
      </div>
      <div className={'menu-option app'}>
        <span>{activeWindow.title}</span>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  activeWindow: [...state.windows].find((window) => window.active),
})

const mapDispatchToProps = (dispatch) => ({
  openContextMenu: (config) => dispatch(openContextMenu(config)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
