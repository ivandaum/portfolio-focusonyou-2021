import { Texture, Plane, Program, Mesh } from 'ogl'

export default class {
  constructor({ gl, vertex, fragment, uniforms, image = null }) {
    const mode = gl.TRIANGLES

    if (image) {
      const texture = new Texture(gl, { flipY: true })
      texture.image = image
      uniforms.uTexture = { value: texture }
    }

    const options = { width: 2, height: 2 }

    const geometry = new Plane(gl, options)
    const program = new Program(gl, { vertex, fragment, uniforms, transparent: true })
    const mesh = new Mesh(gl, { mode, geometry, program })

    return { mesh, program }
  }
}
