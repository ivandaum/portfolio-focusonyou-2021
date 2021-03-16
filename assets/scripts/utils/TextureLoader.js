const PX_DENSITY = 2
export default {
  load(urls) {
    const images = []

    urls.map(url => {
      images.push(
        new Promise(resolve => {
          const img = new Image()
          img.onload = () => resolve(this.getImageData(img))
          img.src = url
        }),
      )
    })

    return Promise.all(images)
  },

  generateFromText({ text, fontSize, width, height }) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = width * PX_DENSITY
    canvas.height = height * PX_DENSITY

    // canvas.style =
    //   'transform-origin: top left; backgroundColor: red; top: 0; left: 0; position: absolute; z-index:10000'
    // document.body.appendChild(canvas)

    canvas.style.transform = 'scale(0.5)'

    ctx.font = `${fontSize * 2}px Soehne`
    ctx.fillStyle = '#ffffff'

    const size = ctx.measureText(text)
    const textWidth = Math.abs(size.actualBoundingBoxLeft) + size.actualBoundingBoxRight
    const textHeight = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent

    ctx.fillText(text, 0, textHeight)

    const image = ctx.getImageData(0, 0, textWidth, textHeight)
    return this.getImageData(image)
  },

  getImageData(image) {
    const width = image.width || image.naturalWidth
    const height = image.height || image.naturalHeight

    return { image, width, height }
  },
}
