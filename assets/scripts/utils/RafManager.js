const MAX_FPS = 60
const FPS_INTERVAL = 1000 / MAX_FPS

const RafManager = {
  callbacks: [],
  raf: [],
  lastDate: Date.now(),
  dt: 0,
  now: 0,

  addQueue(func) {
    const index = Date.now().toString(36) + Math.random().toString(36).substr(2)
    this.callbacks[index] = func
    return index
  },

  removeQueue(index) {
    if (this.callbacks[index]) {
      this.callbacks.splice(index, 1)
      return true
    }

    return false
  },

  render(delta) {
    this.raf = window.requestAnimationFrame(this.render.bind(this))

    this.now = Date.now()
    this.dt = this.now - this.lastDate
    if (this.dt > FPS_INTERVAL) {
      this.lastDate = this.now - (this.dt % FPS_INTERVAL)

      for (let id in this.callbacks) {
        const cb = this.callbacks[id]

        if (cb) {
          cb(delta)
        }
      }
    }
  },

  stop() {
    window.cancelAnimationFrame(this.raf)
    this.raf = null
  },
}

RafManager.render(0)
export default RafManager
