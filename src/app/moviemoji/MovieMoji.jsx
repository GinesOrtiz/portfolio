import React, { useEffect, useState } from 'react'
import { Twemoji } from 'react-emoji-render'

import logo from './logo.png'
import list from './list.json'
import './moviemoji.scss'

const MovieMojie = () => {
  const [isSplash, setIsSplash] = useState(true)
  const [currentMovie, setCurrentMovie] = useState(0)
  const [answer, setAnswer] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [isWinner, setIsWinner] = useState(false)

  const onChangeAnswer = (input) => {
    const formatAnswer = list[currentMovie].movie
      .toLowerCase()
      .replace(/[^a-zA-Z]/gi, '')
    const formatInput = input.toLowerCase().replace(/[^a-zA-Z]/gi, '')
    const correctAnswer = formatAnswer === formatInput

    setAnswer(input)
    setIsValid(correctAnswer)

    if (correctAnswer) {
      const newCurrentMovie = currentMovie + 1

      if (list[newCurrentMovie]) {
        setCurrentMovie(newCurrentMovie)
        setAnswer('')
      } else {
        setIsWinner(true)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false)
    }, 2000)
  }, [])

  return (
    <div className={'moviemoji-app'}>
      <div className={`app-splash ${isSplash ? 'active' : ''}`}>
        <img src={logo} alt={'Movie Bitches logo'} />
        <span>MovieBitches edition</span>
      </div>
      <div className={`app-game ${!isSplash && !isWinner ? 'active' : ''}`}>
        <div className={'game-clue'}>
          <span>What movie is this?</span>
          <Twemoji
            className={'emoji'}
            style={{ background: list[currentMovie].color }}
            svg
            text={list[currentMovie].clue}
          />
        </div>
        <div className={'game-solution'}>
          <input
            className={`input-solution ${isValid ? '' : 'error'}`}
            value={answer}
            onChange={(ev) => onChangeAnswer(ev.target.value)}
          />
        </div>
        <div className={'game-submit'}>
          <span>
            Send more movies to{' '}
            <a target={'_blank'} href={'https://twitter.com/ginesortiz'}>
              @ginesortiz
            </a>
          </span>
        </div>
      </div>
      <div className={`app-winner ${!isSplash && isWinner ? 'active' : ''}`}>
        <img
          src={
            'https://media0.giphy.com/media/7SKuuyt9eKWfuyVvBB/giphy.gif?cid=ecf05e47jhk16a4ay4cpd5o7htywknmzwws08v56t70tpvxf&rid=giphy.gif'
          }
          alt={`You're a winner baby`}
        />
      </div>
    </div>
  )
}

export default MovieMojie
