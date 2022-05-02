import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Parallax from '../animations/Parallax'
import Iframes from '../binders/Iframes'
import ResizeManager from '../utils/ResizeManager'

import anime from 'animejs'
import { easing, duration } from '../constants/anime'

const active = 'is-active'
export default class extends Highway.Renderer {
  onLeaveCompleted() {
    Parallax.destroyAll()
    ResizeManager.removeQueue(this.resizeIframe)
  }

  onLeave() {
    Images.lazy.destroy()
  }

  onEnterCompleted() {
    Images.lazyload()
    const view = this.wrap

    const cover = view.querySelectorAll('.js-about-cover, .js-about-introCover')
    cover.forEach((el) => Parallax.bind(el))

    // const spoilers = view.querySelectorAll('.js-service-spoiler')
    // spoilers.forEach((spoiler) => {
    //   const btn = spoiler.querySelector('.js-service-spoiler--btn')
    //   const container = spoiler.querySelector('.js-service-spoiler--container')
    //   const height = container.querySelector('.js-service-spoiler--content').offsetHeight

    //   btn.addEventListener('click', () => this.toggleSpoiler({ spoiler, container, height }))
    // })

    this.$iframes = view.querySelectorAll('iframe')
    Iframes.bind(this.$iframes)
    this.resizeIframe = ResizeManager.addQueue(() => this.bind())

    this.showreel = {
      $btn: view.querySelector('.js-about-showreel--btn'),
      $container: view.querySelector('.js-about-showreel'),
      $close: view.querySelector('.js-about-showreel--close'),
      $iframe: view.querySelector('.js-about-showreel iframe'),
    }

    this.showreel.$btn.addEventListener('click', () => this.openShowreel())
    this.showreel.$close.addEventListener('click', () => this.closeShowreel())
  }

  openShowreel() {
    this.showreel.$container.classList.add('is-active')
    document.body.classList.add('showreel-open')

    this.showreel.$iframe.src = this.showreel.$container.dataset.url
  }

  closeShowreel() {
    this.showreel.$container.classList.remove('is-active')
    document.body.classList.remove('showreel-open')

    setTimeout(() => (this.showreel.$iframe.src = ''), duration)
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
