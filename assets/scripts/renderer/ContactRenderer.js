import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Parallax from '../animations/Parallax'

export default class extends Highway.Renderer {
  onLeaveCompleted() {
    Parallax.destroyAll()
  }

  onLeave() {
    Images.lazy.destroy()
  }

  onEnterCompleted() {
    Images.lazyload()

    const view = this.wrap
    Parallax.bind(view.querySelector('.js-contact-cover'))
  }
}
