import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Parallax from '../animations/Parallax'
import ResizeManager from '../utils/ResizeManager'

import anime from 'animejs'
import { easing, duration } from '../constants/anime'

const active = 'is-active'
const SECOND = 5

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

    this.$items = view.querySelectorAll('.js-home-menu--item')
    this.$pictures = view.querySelectorAll('.js-home-menu--picture')
    this.$borders = view.querySelectorAll('.js-home-menu-border')

    this.animation = null
    this.count = this.$items.length
    this.index = 0

    this.$items.forEach(($item, index) => {
      $item.addEventListener('mouseenter', () => this.onMouseEnter(index))

      $item.addEventListener('mouseleave', () => this.onMouseLeave(index))
    })

    this.animate()
  }

  onMouseEnter(index) {
    this.animation.pause()
    anime({ targets: this.$borders[this.index], easing, duration, width: 0 })

    for (let i = 0; i < this.count; i++) {
      this.$pictures[i].classList.remove(active)
      this.$items[i].classList.remove(active)

      if (i !== index) {
        this.$items[i].classList.add('is-faded')
      }
    }

    this.$pictures[index].classList.add(active)
  }

  onMouseLeave(index) {
    for (let i = 0; i < this.count; i++) {
      this.$items[i].classList.remove('is-faded')
    }

    this.switchItem(index)
    this.onComplete(index)
  }

  animate() {
    const index = this.index

    this.animation = null
    this.animation = anime({
      targets: this.$borders[index],
      easing: 'linear',
      duration: duration * SECOND,
      width: [0, '100%'],
      begin: () => this.switchItem(index),
      complete: () => this.onComplete(),
    })
  }

  onComplete(overrideIndex) {
    const oldIndex = this.index

    anime({ targets: this.$borders[this.index], easing, duration, width: 0 })

    if (overrideIndex != undefined) {
      this.index = overrideIndex
    } else {
      this.index++
    }

    if (this.index >= this.count) this.index = 0
    if (oldIndex !== this.index) {
      this.animate()
    } else {
      this.animation.play()
    }
  }

  switchItem(index) {
    for (let i = 0; i < this.count; i++) {
      this.$items[i].classList.remove(active)
      this.$pictures[i].classList.remove(active)
    }

    this.$items[index].classList.add(active)
    this.$pictures[index].classList.add(active)
  }
}
