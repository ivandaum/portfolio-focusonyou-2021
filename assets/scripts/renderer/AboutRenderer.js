import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Parallax from '../animations/Parallax'

import anime from 'animejs'
import { easing, duration } from '../constants/anime'

const active = 'is-active'
export default class extends Highway.Renderer {
  onLeaveCompleted() {
    Parallax.destroyAll()
  }

  onLeave() {
    Images.lazy.destroy()
  }

  onEnterCompleted() {
    Images.lazyload()
    const view = this.wrap

    const cover = view.querySelectorAll('.js-about-cover, .js-about-introCover')
    cover.forEach((el) => Parallax.bind(el))

    const spoilers = view.querySelectorAll('.js-service-spoiler')
    spoilers.forEach((spoiler) => {
      const btn = spoiler.querySelector('.js-service-spoiler--btn')
      const container = spoiler.querySelector('.js-service-spoiler--container')
      const height = container.querySelector('.js-service-spoiler--content').offsetHeight

      btn.addEventListener('click', () => this.toggleSpoiler({ spoiler, container, height }))
    })
  }

  toggleSpoiler({ spoiler, container, height }) {
    if (spoiler.classList.contains(active)) {
      spoiler.classList.remove(active)

      anime({
        targets: container,
        height: 0,
        duration,
        easing,
      })
    } else {
      spoiler.classList.add(active)

      anime({
        targets: container,
        height,
        duration,
        easing,
      })
    }
  }
}
