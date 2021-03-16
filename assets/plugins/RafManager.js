import Vue from 'vue'

const RafManager = class {
  constructor() {
    this.callbacks = []
    this.raf = []

    this.render()
  }

  addQueue(func) {
    this.callbacks.push(func)
    return this.callbacks.length - 1
  }

  removeQueue(index) {
    if (this.callbacks[index]) {
      this.callbacks.splice(index, 1)
      return true
    }

    return false
  }

  render(delta) {
    this.raf = window.requestAnimationFrame(this.render.bind(this))
    this.callbacks.map(callback => (typeof callback === 'function' ? callback(delta) : null))
  }

  stop() {
    window.cancelAnimationFrame(this.raf)
    this.raf = null
  }
}

Vue.prototype.RafManager = new RafManager()
