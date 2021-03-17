import Highway from '@dogstudio/highway'

import anime from 'animejs'
import { easing, duration } from '../constants/anime'

class DefaultTransition extends Highway.Transition {
  in({ done, from, to }) {
    from.remove()
    done()
  }

  out({ done }) {
    if (done) {
      done()
    }
  }
}

export default DefaultTransition
