import React from 'react'
import propTypes from 'prop-types'

import Icon from '../common/Icon'

const WindowNavBar = ({
  window,
  onMouseDown,
  fullScreenWindow,
  onNavBarAction,
}) => (
  <div
    className={'navbar'}
    onDoubleClick={() => window.resize && fullScreenWindow(window)}
  >
    <div className={'action-buttons'}>
      <button
        className={'close'}
        onClick={(ev) => onNavBarAction('delete', window, ev)}
      >
        <Icon type={'close'} />
      </button>
      <button
        className={'minimize'}
        onClick={(ev) => onNavBarAction('minimize', window, ev)}
      >
        <Icon type={'minimize'} />
      </button>
      {window.resize && (
        <button
          className={'maximize'}
          onClick={(ev) => onNavBarAction('fullScreen', window, ev)}
        >
          <Icon type={'crop_landscape'} />
        </button>
      )}
    </div>
    <div
      className={'title'}
      onMouseDown={(ev) => onMouseDown(ev, window, 'window')}
    >
      {window.title}
    </div>
  </div>
)

WindowNavBar.propTypes = {
  window: propTypes.object.isRequired,
  onMouseDown: propTypes.func.isRequired,
  fullScreenWindow: propTypes.func.isRequired,
  onNavBarAction: propTypes.func.isRequired,
}

export default WindowNavBar
