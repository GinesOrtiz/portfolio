import React, { useState } from 'react'
import cv from '../curriculum/cv.json'
import profilePic from './profile.png'

import './about.scss'

const AboutApp = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  return (
    <div className={'about-app'}>
      <div className={'about-picture'}>
        <img src={profilePic} alt={'Profile'} />
      </div>
      <div className={'about-details'}>
        <div className={'name'}>Ginés Ortiz Saez</div>
        <div className={'version'}>
          Version {year}.{month}
        </div>

        <div className={'about-qualifications'}>
          {cv.qualities.map((quality) => (
            <div className={'detail'} key={quality.name}>
              <b>{quality.name}</b>
              <span>{quality.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

AboutApp.propTypes = {}

export default AboutApp
