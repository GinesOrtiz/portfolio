import React from 'react'
import AboutApp from './about/About'
import CurriculumApp from './curriculum/Curriculum'
import ContactApp from './contact/Contact'

const windowWidth = window.innerWidth / 2
const windowHeight = window.innerHeight / 2 - 20

export default {
  about: {
    id: 'about',
    x: windowWidth - 650 / 2,
    y: windowHeight - 280 / 2,
    width: 650,
    height: 280,
    title: 'About me',
    createdAt: 0,
    icon: 'account_circle',
    app: AboutApp,
    resize: false,
  },
  curriculum: {
    id: 'test',
    x: windowWidth - 800 / 2,
    y: windowHeight - 700 / 2,
    width: 800,
    height: 700,
    title: 'Curriculum',
    createdAt: 1,
    icon: 'description',
    resize: true,
    app: CurriculumApp,
  },
  contact: {
    id: 'contact',
    x: windowWidth - 500 / 2,
    y: windowHeight - 240 / 2,
    width: 500,
    height: 240,
    title: 'Contact me',
    createdAt: 2,
    icon: 'alternate_email',
    app: ContactApp,
    active: true,
  },
  demo: {
    id: 'demo',
    x: 400,
    y: 300,
    width: 400,
    height: 250,
    title: 'window 2',
    createdAt: 3,
    resize: true,
  },
}
