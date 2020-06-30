import React, { useEffect, useState } from 'react'
import connect from 'react-redux/es/connect/connect'
import propTypes from 'prop-types'

import {
  activeWindow,
  deleteWindow,
  fullScreenWindow,
  minimizeWindow,
} from '../../actions/windows'
import { closeDock } from '../../actions/dock'
import { closeContextMenu } from '../../actions/contextMenu'
import WindowNavBar from './WindowNavbar'
import WindowResizeZone from './WindowResizeZone'

import './window.scss'

const Window = ({
  fullScreenWindow,
  deleteWindow,
  minimizeWindow,
  closeContextMenu,
  activeWindow,
  windows,
  windowPos,
  onMouseDown,
  closeDock,
}) => {
  const [isWindowOld, setIsWindowOld] = useState(false)

  const onNavBarAction = (action, window, ev) => {
    ev.stopPropagation()

    switch (action) {
      case 'fullScreen':
        fullScreenWindow(window)
        break
      case 'delete':
        deleteWindow(window)
        break
      case 'minimize':
        minimizeWindow(window)
        break
    }
  }

  const window = windows[windowPos]

  useEffect(() => {
    setTimeout(() => {
      setIsWindowOld(true)
    }, 500)
  }, [])

  const App = window.app

  return (
    <div
      className={`window frame ${window.active ? 'active' : ''} ${
        window.className || ''
      } ${isWindowOld ? '' : 'new'}`}
      onClick={(ev) => {
        ev.stopPropagation()
        closeContextMenu()
        activeWindow(window)
        closeDock()
      }}
      style={{
        top: `${window.y}px`,
        left: `${window.x}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
        transition: window.transition,
        zIndex: window.active ? 2 : 1,
        ...window.styles,
      }}
    >
      <WindowNavBar
        window={window}
        onNavBarAction={onNavBarAction}
        onMouseDown={onMouseDown}
        fullScreenWindow={fullScreenWindow}
      />
      {window.resize && (
        <WindowResizeZone window={window} onMouseDown={onMouseDown} />
      )}
      <div className={'content'}>
        {window.app ? <App /> : <pre>{JSON.stringify(window, null, 2)}</pre>}
      </div>
    </div>
  )
}

Window.propTypes = {
  windows: propTypes.array.isRequired,
  activeWindow: propTypes.func.isRequired,
  fullScreenWindow: propTypes.func.isRequired,
  deleteWindow: propTypes.func.isRequired,
  minimizeWindow: propTypes.func.isRequired,
  closeContextMenu: propTypes.func.isRequired,
  closeDock: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  windows: state.windows,
})

const mapDispatchToProps = (dispatch) => ({
  activeWindow: (window) => dispatch(activeWindow(window)),
  fullScreenWindow: (window) => dispatch(fullScreenWindow(window)),
  deleteWindow: (window) => dispatch(deleteWindow(window)),
  minimizeWindow: (window) => dispatch(minimizeWindow(window)),
  closeContextMenu: () => dispatch(closeContextMenu()),
  closeDock: () => dispatch(closeDock()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Window)
