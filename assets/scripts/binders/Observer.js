import { observe } from '../functions'

const visible = 'visible'

const Observer = {
  queue: [],
  timingBeforeProcessQueue: null,

  init(array, callback) {
    this.queue = []
    this.timingBeforeProcessQueue = null
    this.callback = callback

    array.forEach((el) =>
      observe(el, (isVisible) => {
        if (el.classList.contains(visible)) {
          return false
        }

        const slug = el.dataset.slug
        if (isVisible) {
          this.addToQueue(el)
        } else if (!isVisible && this.queue[slug] != undefined) {
          this.removeFromQueue(slug)
        }
      }),
    )
  },

  addToQueue(el) {
    const slug = el.dataset.slug
    this.queue[slug] = el
    clearTimeout(this.timingBeforeProcessQueue)
    this.timingBeforeProcessQueue = setTimeout(() => this.processQueue(), 100)
  },

  removeFromQueue(slug) {
    delete this.queue[slug]
  },

  processQueue() {
    let i = 0
    for (let slug in this.queue) {
      const el = this.queue[slug]
      setTimeout(() => {
        el.classList.add(visible)
        if (this.callback) this.callback(el)
        delete this.queue[slug]
      }, i * 50)
      i++
    }
  },
}

export default Observer
