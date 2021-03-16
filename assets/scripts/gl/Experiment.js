import { Renderer, Camera, Transform, Vec2 } from 'ogl'

import vertex from '~/shaders/experiment.vert'
import fragment from '~/shaders/experiment.frag'
import PlaneConstructor from '~/scripts/shapes/PlaneConstructor'

export default class {
  constructor({ $el, width, height }) {
    this.$el = $el
    this.width = width
    this.height = height

    this.index = 0
    this.nextIndex = 0

    this.planes = []
    this.mouse = new Vec2(0.5)

    this.initRenderer()
    this.initCamera()
  }

  initRenderer() {
    const dpr = 1
    this.renderer = new Renderer({ dpr })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.$el.appendChild(this.gl.canvas)
  }

  initCamera() {
    this.scene = new Transform()

    this.camera = new Camera(this.gl, { fov: 15 })
    this.camera.position.set(0, 0, 15)
    this.camera.lookAt([0, 0, 0])
  }

  createPlanes(imageDatas) {
    const gl = this.gl

    imageDatas.map((data, i) => {
      const image = data.image
      const width = data.width
      const height = data.height

      const scale = 1.0
      const ratio = width / height
      const t = 0
      const revert = i === 0 ? 1 : 0
      const animate = i === 0

      const uniforms = {
        uMouse: { value: this.mouse },
        uScale: { value: scale },
        uRatio: { value: ratio },
        uTime: { value: 0 },
        uT: { value: t },
        uRevert: { value: revert },
        uResolution: { value: new Vec2(this.width, this.height) },
      }

      const { mesh, program } = new PlaneConstructor({ gl, vertex, fragment, image, uniforms })

      mesh.setParent(this.scene)
      mesh.position.set(0, 0, -1 * i * 0.01)

      this.planes.push({ mesh, program, t, revert, animate })
    })
  }

  switchPlane({ x, y }) {
    this.index = this.nextIndex
    this.nextIndex = this.index + 1

    if (this.nextIndex >= this.planes.length) this.nextIndex = 0

    this.mouse = new Vec2(x / this.width, 1 - y / this.height)
    this.planes.map((plane, i) => {
      plane.program.uniforms.uMouse.value = this.mouse
      plane.t = 0

      plane.revert = this.nextIndex === i ? 1 : 0
      plane.animate = i === this.nextIndex || i === this.index
    })
  }

  setMouse({ x, y }) {
    // Get mouse value in -1 to 1 range, with y flipped
    this.mouse.set(x / this.width, 1 - y / this.height)
  }

  render(uTime) {
    const scene = this.scene
    const camera = this.camera

    this.planes.map((plane, i) => {
      if (plane.animate) {
        plane.t += 0.01
      } else {
        plane.t = 1
      }

      plane.t = Math.min(1, plane.t)

      plane.program.uniforms.uT.value = plane.t
      plane.program.uniforms.uRevert.value = plane.revert
      plane.program.uniforms.uTime.value = uTime
    })

    this.renderer.render({ scene, camera })
  }

  onResize({ width, height }) {
    const aspect = width / height

    this.width = width
    this.height = height

    this.planes.map(plane => {
      plane.program.uniforms.uResolution.value = vec2(this.width, this.height)
    })

    this.renderer.setSize(width, height)
    this.camera.perspective({ aspect })
  }
}
