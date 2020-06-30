import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

import { openContextMenu } from '../../actions/contextMenu'
import { createWindow } from '../../actions/windows'
import './curriculum.scss'
import cv from './cv.json'
import apps from '../../app/list'

const CurriculumApp = ({ openContextMenu, createWindow }) => {
  const onContextMenu = (ev) => {
    const position = {
      top: ev.clientY,
      left: ev.clientX,
    }

    ev.preventDefault()
    ev.stopPropagation()
    openContextMenu({
      position,
      content: [
        {
          value: 'Contact me',
          icon: 'alternate_email',
          action: () => createWindow(apps.contact),
        },
        {
          value: 'Download PDF',
          icon: 'insert_drive_file',
          action: () => console.log('test'),
        },
      ],
    })
  }

  return (
    <div className={'cv-app'} onContextMenu={onContextMenu}>
      <div className={'cv-top row'}>
        <div className={'col'}>
          <div className={'title'}>{cv.name}</div>
          <div className={'subtitle'}>{cv.title}</div>
        </div>
        <div className={'col right'}>
          <div className={'title'}>{cv.tel}</div>
          <div className={'subtitle'}>
            {cv.links.map((link) => (
              <div key={link}>{link}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={'cv-description'}>{cv.description}</div>
      <div className={'cv-jobs'}>
        <div className={'title'}>Experience</div>
        {cv.jobs.map((job) => (
          <div className={'job'} key={job.company}>
            <div className={'job-name'}>
              {job.company} - {job.title}
            </div>
            <div className={'row subtitle job-meta'}>
              <div className={'col'}>{job.time}</div>
              <div className={'col right'}>{job.tools}</div>
            </div>
            <div className={'job-description'}>{job.description}</div>
            <div>{job.responsibility}</div>
          </div>
        ))}
      </div>
      <div className={'cv-other'}>
        <div className={'title'}>Other information</div>
        <div className={'other'}>
          <b>Education</b> {cv.other.education}
        </div>
        <div className={'other'}>
          <b>Languages</b> {cv.other.languages}
        </div>
      </div>
    </div>
  )
}

CurriculumApp.propTypes = {
  openContextMenu: propTypes.func.isRequired,
  createWindow: propTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createWindow: (window) => dispatch(createWindow(window)),
  openContextMenu: (config) => dispatch(openContextMenu(config)),
})

export default connect(null, mapDispatchToProps)(CurriculumApp)
