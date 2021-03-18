const RATIO = 9 / 16

const Iframes = {
  bind(array) {
    array.forEach((iframe) => this.resize(iframe))
  },

  resize(iframe) {
    const width = iframe.offsetWidth
    console.log(width)
    iframe.style.height = `${width * RATIO}px`
  },
}

export default Iframes
