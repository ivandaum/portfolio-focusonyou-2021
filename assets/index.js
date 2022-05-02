import './styles/main.scss'

import './scripts/vendor/IntersectionObserver'

import Highway from '@dogstudio/highway'
import store from './scripts/utils/store'
import Navbar from './scripts/nav/Navbar'

import ScrollManager from './scripts/utils/ScrollManager'
import ResizeManager from './scripts/utils/ResizeManager'

import DefaultRenderer from './scripts/renderer/DefaultRenderer'
import HomeRenderer from './scripts/renderer/HomeRenderer'
import ContactRenderer from './scripts/renderer/ContactRenderer'
import AboutRenderer from './scripts/renderer/AboutRenderer'
import GaleryRenderer from './scripts/renderer/GaleryRenderer'
import ProjectRenderer from './scripts/renderer/ProjectRenderer'
import DefaultTransition from './scripts/transitions/DefaultTransition'

const renderers = {
  home: HomeRenderer,
  contact: ContactRenderer,
  projects: DefaultRenderer,
  about: AboutRenderer,
  project: ProjectRenderer,
  galery: GaleryRenderer,
  services: DefaultRenderer,
}

const transitions = {
  default: DefaultTransition,
}

const core = new Highway.Core({ renderers, transitions })
  .on('NAVIGATE_OUT', () => {
    document.body.classList.add('loading')
  })
  .on('NAVIGATE_END', ({ to, location }) => {
    Navbar.update({ location })
    ScrollManager.update({ $view: to.view })

    if (typeof gtag !== 'undefined' && window.gaId) {
      // eslint-disable-next-line
      gtag('config', window.gaId, {
        page_path: location.pathname,
        page_title: to.page.title,
        page_location: location.href,
      })
    }
  })
  .on('NAVIGATE_IN', ({ to }) => {
    ScrollManager.snapTo(0)
    const page = to.view.dataset.routerView
    document.body.dataset.page = page
  })
  .on('NAVIGATE_ERROR', ({ location }) => {
    window.location.href = location.href
  })

function app() {
  const $view = document.querySelector('[data-router-view]:last-of-type')

  store.init()
  ScrollManager.init({ $view })

  ResizeManager.init()
  ResizeManager.addQueue(() => store.setGlobalVars())

  // store.updateBody($view)

  const btn = document.querySelector('.js-navbar-btn')
  const content = document.querySelector('.js-navbar-content')

  Navbar.init({ btn, content })
  //     Nav.bindActiveLink({ color: $view.dataset.color })
  //     Nav.updateLoader({ color: $view.dataset.loader, firstLoading: true })
  //     setTimeout(() => Nav.show(), 500)
  const trans = core.Helpers.transitions[core.properties.slug] || core.Helpers.transitions.default
  trans.prototype.in({ to: document.body, done: null, from: null })
  //     FontLoader.default(() => {
  //         trans.prototype.in({
  //             to: $view,
  //             done: () => ScrollManager.update({ $view }),
  //         })
  //     })
  //     const page = $view.dataset.routerView
  //     document.body.dataset.page = page
  const style = 'background-color:black; padding:5px; color:white;'
  console.log('%cCode by Ivan Daum', style)
  console.log('%c→ https://ivandaum.dev', style)
  console.log('%c→ https://twitter.com/ivandaum', style)
  document.body.classList.remove('is-first-load')
}

app()
