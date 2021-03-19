import anime from 'animejs'
import RafManager from '../utils/RafManager'
import { easing, duration } from '../constants/anime'

export default {
  scroll: 0,
  scrollEased: 0,
  oldScroll: 0,
  spinY: 0,
  canScroll: true,
  isScrolling: false,
  funcOnScroll: [],

  init({ $view }) {
    this.$app = document.querySelector('.js-app')
    this.$view = $view

    RafManager.addQueue(this.onScroll.bind(this))
  },

  update({ $view }) {
    this.$view = $view
  },

  onScroll() {
    if (!this.canScroll || !this.$view) {
      return false
    }

    this.oldScroll = this.scroll
    this.scroll = this.getScrollTop()
    this.scrollEased += (this.scroll - this.scrollEased) * 0.3

    this.spinY = this.scroll - this.oldScroll
    this.isScrolling = this.spinY !== 0

    this.funcOnScroll.map((func) => func())
  },

  getScrollTop() {
    return window.pageYOffset || this.$app.scrollTop || 0
  },

  /** On scroll events */

  addQueue(func) {
    this.funcOnScroll.push(func)
    return this.funcOnScroll.length - 1
  },

  removeQueue(index) {
    if (this.funcOnScroll[index]) {
      this.funcOnScroll.splice(index, 1)
      return true
    }

    return false
  },

  /** DOM functions */

  scrollTo({ y, complete }) {
    const targets = { y: this.scroll }

    anime({
      targets,
      y,
      duration,
      easing,
      update: () => {
        this.$app.scrollTo(0, targets.y)
      },
      complete,
    })
  },

  snapTo(y) {
    this.scroll = y
    this.scrollEased = y
    this.$app.scrollTo(0, y)
  },
}
