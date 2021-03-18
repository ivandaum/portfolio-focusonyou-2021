import Highway from '@dogstudio/highway'

import anime from 'animejs'
import { easing, duration } from '../constants/anime'

class DefaultTransition extends Highway.Transition {
  in({ done, from, to }) {
    from.remove()
    done()

    document.body.classList.remove('is-loading')
    document.body.classList.add('is-loading-end')

    anime({
      targets: to,
      easing,
      duration,
      translateY: ['5rem', 0],
      complete: () => {
        document.body.classList.remove('is-loading-end')
      },
    })
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
