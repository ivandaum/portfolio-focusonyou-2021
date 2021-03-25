import { observe, range, lerp } from '../functions'
import RafManager from '../utils/RafManager'
import ScrollManager from '../utils/ScrollManager'
import store from '../utils/store'

const Parallax = {
  elements: [],
  raf: [],
  bind(el) {
    const isVisible = false
    const translateY = 0
    const raf = null
    const rect = el.getBoundingClientRect()
    const offset = rect.top === 0 ? 0 : store.windowHeight
    const value = el.dataset.value ? JSON.parse(el.dataset.value) : [0, 50]
    const obj = { el, isVisible, translateY, rect, raf, offset, value }

    this.elements.push(obj)
    const index = this.elements.length - 1

    observe(el, (isVisible) => {
      this.elements[index].isVisible = isVisible
    })

    this.elements[index].raf = RafManager.addQueue(() => this.render(index))
  },

  destroyAll() {
    this.elements.map((el) => RafManager.removeQueue(el.raf))
  },

  render(index) {
    const data = this.elements[index]
    const scroll = ScrollManager.scroll

    const top = data.rect.top - data.offset
    const bottom = data.rect.top + data.rect.height + store.windowHeight

    if (data.isVisible) {
      const t = Math.max(0, Math.min(1, range(scroll, top, bottom) * 0.01))
      data.translateY = lerp(data.value[0], data.value[1], t)
      data.el.style.transform = `translateY(${data.translateY}%)`
    }
  },
}

export default Parallax
