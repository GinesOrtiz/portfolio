import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import {
  openWindow,
  createWindow,
  deleteWindow,
  activeWindow,
} from '../../actions/windows'
import { getMessage } from './commands.js'
import apps from '../list'
import './terminal.scss'

const TerminalApp = ({
  windows,
  app,
  openWindow,
  createWindow,
  deleteWindow,
  activeWindow,
}) => {
  const [history, setHistory] = useState([])
  const [command, setCommand] = useState('')
  const input = useRef(null)

  const onTerminalClick = () => {
    if (input.current) {
      input.current.focus()
    }
  }

  const processCommand = (cmd) => {
    const params = cmd.split(' ')

    switch (params[0]) {
      case 'open':
        addHistory(cmd)
        if (apps[params[1]]) {
          openWindow(apps[params[1]])
        } else {
          addHistory(getMessage('openError', { program: params[1] }), false)
        }
        break
      case 'help':
      case 'version':
        addHistory(cmd)
        addHistory(getMessage(cmd, { command: cmd }), false)
        break
      case 'clear':
        setHistory([])
        break
      case 'hacker':
        windows.forEach((window) => deleteWindow(window))

        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            const terminalCopy = {
              ...apps.terminal,
              id: `terminal-${i}`,
              command: 'hacker_mode',
              x: (window.innerWidth * [5, 20, 10, 50, 55, 65][i]) / 100,
              y: (window.innerHeight * [5, 30, 60, 55, 10, 30][i]) / 100,
              icon: [
                'developer_board',
                'security',
                'memory',
                'router',
                'sim_card',
                'vpn_lock',
              ][i],
            }

            createWindow(terminalCopy)
            activeWindow(terminalCopy)
          }, 100 * i)
        }

        setTimeout(() => {
          createWindow(apps.about)
        }, 25 * 220)
        break
      case 'exit':
        addHistory(cmd)
        addHistory(getMessage('logout'), false)

        setTimeout(() => {
          deleteWindow(app.id)
        }, 1000)
        break
      case 'hacker_mode':
        const amount = 20
        const delay = 220

        for (let i = 0; i < amount; i++) {
          setTimeout(() => {
            addHistory(
              new Array(Math.floor(100 + Math.random() * 300))
                .fill('')
                .map(() => String.fromCharCode(Math.random() * 128))
            )
          }, delay * i)
        }

        setTimeout(() => {
          deleteWindow(app.id)
        }, (delay + 20) * amount)

        break
      default:
        addHistory(cmd)
        addHistory(getMessage('error', { command: cmd }), false)
    }

    setCommand('')
  }

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      processCommand(command)
    }
  }

  const addHistory = (cmd, input = true) => {
    setCommand('')
    setHistory((currentHistory) => [
      ...currentHistory,
      {
        key: [+new Date(), cmd].join('-'),
        input,
        cmd,
      },
    ])
  }

  useEffect(() => {
    if (input.current) {
      input.current.scrollIntoView({
        block: 'end',
        inline: 'nearest',
      })
    }
  }, [history])

  useEffect(() => {
    if (app.command) {
      processCommand(app.command)
    } else {
      addHistory(getMessage('welcome'), false)
      onTerminalClick()
    }
  }, [])

  return (
    <div
      className={`terminal-app command-${app.command || ''}`}
      onClick={onTerminalClick}
    >
      <div className={'terminal-history'}>
        {history.map((msg) => (
          <div className={'history-cmd'} key={msg.key}>
            {msg.input && <span className={'dollar'}>$ </span>}
            <pre>{msg.cmd}</pre>
          </div>
        ))}
      </div>
      <div className={'terminal-command'}>
        <span className={'dollar'}>$ </span>
        <input
          ref={input}
          value={command}
          onChange={(ev) => setCommand(ev.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}

TerminalApp.propTypes = {
  windows: propTypes.array.isRequired,
  app: propTypes.object.isRequired,
  activeWindow: propTypes.func.isRequired,
  openWindow: propTypes.func.isRequired,
  deleteWindow: propTypes.func.isRequired,
  createWindow: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  windows: state.windows,
})

const mapDispatchToProps = (dispatch) => ({
  activeWindow: (window) => dispatch(activeWindow(window)),
  openWindow: (window) => dispatch(openWindow(window)),
  deleteWindow: (window) => dispatch(deleteWindow(window)),
  createWindow: (window) => dispatch(createWindow(window)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TerminalApp)
