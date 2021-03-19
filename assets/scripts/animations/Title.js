import anime from 'animejs'
import { easing, duration } from '../constants/anime'

const Title = {
  init(view) {
    const title = view.querySelectorAll('.js-main-title p')
    const subtitle = view.querySelector('.js-sub-title')

    this.timeline = anime.timeline({ duration, easing, autoplay: false })

    this.timeline.add(
      {
        targets: title,
        translateY: ['100%', '0'],
      },
      0,
    )
  },

  show() {
    this.timeline.play()
  },
}

export default Title
