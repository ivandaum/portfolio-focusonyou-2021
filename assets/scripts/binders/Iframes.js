const RATIO = 9 / 16

const Iframes = {
  bind(array) {
    array.forEach((iframe) => this.resize(iframe))
  },

  resize(iframe) {
    const width = iframe.offsetWidth
    iframe.style.height = `${width * RATIO}px`
  },
}

export default Iframes
