import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Observer from '../binders/Observer'

export default class extends Highway.Renderer {
  onLeaveCompleted() {}

  onLeave() {
    Images.lazy.destroy()
  }

  onEnterCompleted() {
    Images.lazyload()

    const $view = this.wrap
    const $pictures = $view.querySelectorAll('.js-picture')

    Observer.init($pictures)
  }
}
