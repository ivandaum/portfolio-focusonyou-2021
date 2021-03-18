import Highway from '@dogstudio/highway'
import ImagesLoader from '../utils/ImagesLoader'

import { observe } from '../functions'

const visible = 'visible'

export default class extends Highway.Renderer {
  onLeaveCompleted() {}

  onLeave() {
    ImagesLoader.lazy.destroy()
  }

  onEnterCompleted() {
    ImagesLoader.lazyload()

    const $view = this.wrap
    const $pictures = $view.querySelectorAll('.js-picture')

    this.queue = []
    this.timingBeforeProcess = null

    $pictures.forEach((picture) =>
      observe(picture, (isVisible) => {
        if (picture.classList.contains(visible)) {
          return false
        }

        const slug = picture.dataset.slug
        if (isVisible) {
          this.addToQueue(picture)
        } else if (!isVisible && this.queue[slug] != undefined) {
          this.removeFromQueue(slug)
        }
      }),
    )
  }

  addToQueue(picture) {
    const slug = picture.dataset.slug
    this.queue[slug] = picture
    clearTimeout(this.timingBeforeProcess)
    this.timingBeforeProcess = setTimeout(() => this.processQueue(), 100)
  }

  removeFromQueue(slug) {
    delete this.queue[slug]
  }

  processQueue() {
    let i = 0
    for (let slug in this.queue) {
      const picture = this.queue[slug]
      setTimeout(() => {
        picture.classList.add(visible)
        delete this.queue[slug]
      }, i * 50)
      i++
    }
  }
}
