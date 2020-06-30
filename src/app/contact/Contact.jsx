import React from 'react'

import './contact.scss'

const ContactApp = () => {
  const links = [
    {
      title: 'Email',
      link: 'mailto:gines.o.saez@gmail.com',
      text: 'gines.o.saez@gmail.com',
    },
    {
      title: 'Github',
      link: 'https://github.com/ginesortiz',
      text: 'github.com/ginesortiz',
    },
    {
      title: 'LinkedIn',
      link: 'https://linkedin.com/in/ginesortiz',
      text: 'linkedin.com/in/ginesortiz',
    },
    {
      title: 'Twitter',
      link: 'https://twitter.com/ginesortiz',
      text: 'twitter.com/ginesortiz',
    },
    {
      title: 'Telegram',
      link: 'https://telegram.me/ginesortiz',
      text: 'telegram.me/ginesortiz',
    },
  ]
  return (
    <div className={'contact-app'}>
      <div className={'row'}>
        {links.map(({ link, title, text }) => (
          <div key={title} className={'link col'}>
            <b>{title}</b>{' '}
            <a href={link} target={'_blank'}>
              {text || link}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

ContactApp.propTypes = {}

export default ContactApp
