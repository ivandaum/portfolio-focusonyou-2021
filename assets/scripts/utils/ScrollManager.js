import anime from 'animejs'
import RafManager from '../utils/RafManager'
import breakpoints from '../constants/breakpoints'

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
        this.$scroller = window
        this.$app = document.body.querySelector('main')
        this.$view = $view

        RafManager.addQueue(this.onScroll.bind(this))
    },

    onScroll() {
        if (!this.canScroll || !this.$view) {
            return false
        }

        this.oldScroll = this.scroll
        this.scroll = this.getScrollTop()
        this.scrollEased += (this.scroll - this.scrollEased) * 0.3

        if (breakpoints.isTouch()) {
            this.scrollEased = this.scroll
        }

        this.spinY = this.scroll - this.oldScroll
        this.isScrolling = this.spinY !== 0

        this.funcOnScroll.map((func) => func())
    },

    getScrollTop() {
        return window.pageYOffset || this.$scroller.scrollTop || 0
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

    isLocked() {
        return !this.canScroll
    },

    lock() {
        const scroll = this.scroll
        document.body.classList.add('lock')
        this.$view.transform = `translateY(${scroll}px)`
        this.canScroll = false
    },

    unlock() {
        document.body.classList.remove('lock')
        this.$view.transform = ''
        this.snapTo(this.scroll)
        this.canScroll = true
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
                this.$scroller.scrollTo(0, targets.y)
            },
            complete,
        })
    },

    snapTo(y) {
        this.scroll = y
        this.scrollEased = y
        this.$scroller.scrollTo(0, y)
    },
}
