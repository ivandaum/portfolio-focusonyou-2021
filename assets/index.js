import './styles/main.scss'

import './scripts/vendor/IntersectionObserver'

import Highway from '@dogstudio/highway'
import store from './scripts/utils/store'
import Navbar from './scripts/nav/Navbar'

// import ScrollManager from './utils/ScrollManager'
import ResizeManager from './scripts/utils/ResizeManager'

import DefaultRenderer from './scripts/renderer/DefaultRenderer'
import GaleryRenderer from './scripts/renderer/GaleryRenderer'
import ProjectRenderer from './scripts/renderer/ProjectRenderer'
import DefaultTransition from './scripts/transitions/DefaultTransition'

const renderers = {
  home: DefaultRenderer,
  contact: DefaultRenderer,
  projects: DefaultRenderer,
  about: DefaultRenderer,
  project: ProjectRenderer,
  galery: GaleryRenderer,
}

const transitions = {
  default: DefaultTransition,
}

new Highway.Core({ renderers, transitions })
  .on('NAVIGATE_OUT', () => {
    document.body.classList.add('loading')
  })
  .on('NAVIGATE_END', ({ to, location }) => {
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
    const page = to.view.dataset.routerView
    document.body.dataset.page = page
  })
  .on('NAVIGATE_ERROR', ({ location }) => {
    window.location.href = location.href
  })

function app() {
  const $view = document.querySelector('[data-router-view]:last-of-type')

  store.init()
  // ScrollManager.init({ $view })
  ResizeManager.init()
  ResizeManager.addQueue(() => store.setGlobalVars())

  // store.updateBody($view)

  const btn = document.querySelector('.js-navbar-btn')
  const content = document.querySelector('.js-navbar-content')

  Navbar.init({ btn, content })
  //     Nav.bindActiveLink({ color: $view.dataset.color })
  //     Nav.updateLoader({ color: $view.dataset.loader, firstLoading: true })
  //     setTimeout(() => Nav.show(), 500)
  // const trans = core.Helpers.transitions[core.properties.slug] || core.Helpers.transitions.default
  // trans.prototype.in({ to: document.body, done: null, from: null })
  //     FontLoader.default(() => {
  //         trans.prototype.in({
  //             to: $view,
  //             done: () => ScrollManager.update({ $view }),
  //         })
  //     })
  //     const page = $view.dataset.routerView
  //     document.body.dataset.page = page
  //     const style = 'background-color:black; padding:5px; color:white;'
  //     console.log('%cCode by Ivan Daum', style)
  //     console.log('%c→ https://ivandaum.fr', style)
  //     console.log('%c→ https://twitter.com/ivandaum', style)
  document.body.classList.remove('is-first-load')
}

app()
