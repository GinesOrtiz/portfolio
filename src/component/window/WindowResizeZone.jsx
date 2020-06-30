import React from 'react'
import propTypes from 'prop-types'

const WindowResizeZone = ({ window, onMouseDown }) => (
  <>
    {['tl', 't', 'tr', 'r', 'br', 'b', 'bl', 'l'].map((resizes) => (
      <div
        className={`resizes ${resizes}`}
        key={resizes}
        onMouseDown={(ev) => onMouseDown(ev, window, `resize-${resizes}`)}
      />
    ))}
  </>
)

WindowResizeZone.propTypes = {
  window: propTypes.object.isRequired,
  onMouseDown: propTypes.func.isRequired,
}

export default WindowResizeZone
