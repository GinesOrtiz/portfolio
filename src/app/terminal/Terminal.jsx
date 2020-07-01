import React, { useEffect, useRef, useState } from 'react'

import commands from './commands.json'
import './terminal.scss'

const TerminalApp = () => {
  const [history, setHistory] = useState([])
  const [command, setCommand] = useState('')
  const input = useRef(null)

  const onTerminalClick = () => {
    if (input.current) {
      input.current.focus()
    }
  }

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      if (command === 'clear') {
        setHistory([])
        setCommand('')
      } else {
        addHistory(command)
        addHistory(
          commands[command] ||
            commands.fallback.replace('{{command}}', command),
          false
        )
      }
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
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }, [history])

  useEffect(() => {
    addHistory('Welcome back!')
    addHistory('For more information type: help')
    onTerminalClick()
  }, [])

  return (
    <div className={'terminal-app'} onClick={onTerminalClick}>
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

export default TerminalApp
