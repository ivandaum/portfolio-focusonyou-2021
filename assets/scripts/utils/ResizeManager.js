export default {
  functions: [],
  init() {
    window.addEventListener('resize', this.onResize.bind(this))
  },

  addQueue(func) {
    const index = Date.now().toString(36) + Math.random().toString(36).substr(2)
    this.functions[index] = func
    return index
  },

  removeQueue(index) {
    if (this.functions[index]) {
      this.functions.splice(index, 1)
      return true
    }

    return false
  },

  onResize() {
    this.functions.map((func) => func())
  },
}
