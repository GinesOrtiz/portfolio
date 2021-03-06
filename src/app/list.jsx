import AboutApp from './about/About'
import CurriculumApp from './curriculum/Curriculum'
import ContactApp from './contact/Contact'
import TerminalApp from './terminal/Terminal'
import MovieMojie from './moviemoji/MovieMoji'

export default {
  about: {
    id: 'about',
    width: 650,
    height: 280,
    title: 'About me',
    createdAt: 0,
    icon: 'account_circle',
    app: AboutApp,
    resize: false,
    active: true,
  },
  curriculum: {
    id: 'curriculum',
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
    width: 500,
    height: 240,
    title: 'Contact me',
    createdAt: 2,
    icon: 'alternate_email',
    app: ContactApp,
  },
  terminal: {
    id: 'terminal',
    width: 520,
    height: 300,
    title: 'Terminal',
    createdAt: 3,
    icon: 'airplay',
    resize: true,
    app: TerminalApp,
  },
  moviemoji: {
    id: 'moviemoji',
    width: 520,
    height: 300,
    title: 'Guess the movie by emojis',
    createdAt: 4,
    icon: 'movie_filter',
    resize: false,
    app: MovieMojie,
  },
}
