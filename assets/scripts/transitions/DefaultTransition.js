import Highway from '@dogstudio/highway'

import anime from 'animejs'
import { easing, duration } from '../constants/anime'

class DefaultTransition extends Highway.Transition {
  in({ done, from, to }) {
    if (from) from.remove()

    document.body.classList.remove('is-loading')
    document.body.classList.add('is-loading-end')

    if (done) done()

    const timeline = anime.timeline({
      duration,
      easing,
      autoplay: false,
      complete: () => document.body.classList.remove('is-loading-end'),
    })

    const titles = to.querySelectorAll('.js-main-title p, .js-sub-title')
    const content = to.querySelector('.js-content')

    if (titles.length) {
      timeline.add(
        {
          targets: titles,
          delay: anime.stagger(100),
          translateY: ['.5em', '0'],
          scaleY: [1.4, 1],
          opacity: [0, 1],
        },
        0,
      )
    }

    if (content) {
      timeline.add(
        {
          targets: content,
          translateY: ['1rem', '0'],
          scaleY: [1.2, 1],
          opacity: [0, 1],
        },
        250,
      )
    }

    timeline.play()
  }

  out({ done }) {
    document.body.classList.add('is-loading')
    setTimeout(() => {
      if (done) {
        done()
      }
    }, duration)
  }
}

export default DefaultTransition
