import React, { useEffect, useState } from 'react'
import connect from 'react-redux/es/connect/connect'
import propTypes from 'prop-types'

import { openDock, closeDock } from '../../actions/dock'
import Icon from '../common/Icon'
import {
  activeWindow,
  createWindow,
  minimizeWindow,
} from '../../actions/windows'
import apps from '../../app/list'
import './dock.scss'

const Dock = ({
  windows,
  dock,
  createWindow,
  activeWindow,
  minimizeWindow,
  onOpenDock,
  onCloseDock,
}) => {
  const [dirtyMenuOpen, setDirtyMenuOpen] = useState(false)
  const isMenuOpen = dock.open

  const onActiveWindow = (window) => {
    if (window.prev) {
      minimizeWindow(window)
    } else {
      activeWindow(window)
    }
  }

  const onOpenApp = (window) => {
    const originalWindow = windows.find((win) => win.id === window.id)

    createWindow(window)
    activeWindow(window)

    if (originalWindow && originalWindow.prev) {
      minimizeWindow(window)
    }

    onCloseDock()
  }

  useEffect(() => {
    if (isMenuOpen) {
      setDirtyMenuOpen(true)
    }
  }, [isMenuOpen])

  return (
    <>
      {dirtyMenuOpen && (
        <div className={`dock-menu ${isMenuOpen ? 'open' : 'close'}`}>
          {Object.values(apps).map((app, appIndex) => (
            <div
              key={app.id}
              className={'menu-app'}
              onClick={() => onOpenApp(app)}
            >
              <Icon type={app.icon || 'extension'} />
              <span>{app.title}</span>
            </div>
          ))}
        </div>
      )}
      <div className={'dock'}>
        <div className={'dock-display'}>
          <div className={'dock-actions'}>
            <button
              className={'dock-button'}
              onClick={() => (isMenuOpen ? onCloseDock() : onOpenDock())}
            >
              <Icon type={'apps'} />
            </button>
          </div>
          <div className={'dock-separator'} />
          <div className={'dock-apps'}>
            {windows.map((window) => (
              <button
                data-app={window.id}
                key={window.id}
                className={`dock-button ${window.active ? 'active' : ''}`}
                onClick={() => onActiveWindow(window)}
              >
                {window.customIcon ? (
                  <div style={{ backgroundImage: window.customIcon }} />
                ) : (
                  <div>
                    <Icon type={window.icon || 'extension'} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

Dock.propTypes = {
  windows: propTypes.array.isRequired,
  dock: propTypes.object.isRequired,
  createWindow: propTypes.func.isRequired,
  activeWindow: propTypes.func.isRequired,
  minimizeWindow: propTypes.func.isRequired,
  onOpenDock: propTypes.func.isRequired,
  onCloseDock: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  dock: state.dock,
  windows: [...state.windows].sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : -1
  ),
})

const mapDispatchToProps = (dispatch) => ({
  onOpenDock: () => dispatch(openDock()),
  onCloseDock: () => dispatch(closeDock()),
  createWindow: (window) => dispatch(createWindow(window)),
  activeWindow: (window) => dispatch(activeWindow(window)),
  minimizeWindow: (window) => dispatch(minimizeWindow(window)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dock)
