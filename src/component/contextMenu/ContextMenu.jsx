import React from 'react'
import { connect } from 'react-redux'

import { closeContextMenu } from '../../actions/contextMenu'
import Icon from '../common/Icon'
import './contextMenu.scss'

const ContextMenu = (props) => {
  if (!props.contextMenu.active) {
    return null
  }

  return (
    <div className={'context-menu'}>
      <div style={props.contextMenu.position} className={'menu'}>
        {props.contextMenu.content.map((option) => (
          <div
            onClick={(ev) => option.action && option.action(option)}
            className={'menu-option'}
            key={option.value}
          >
            {option.icon && <Icon type={option.icon} />}
            <span>{option.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  contextMenu: state.contextMenu,
})

const mapDispatchToProps = (dispatch) => ({
  closeContextMenu: () => dispatch(closeContextMenu()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu)
