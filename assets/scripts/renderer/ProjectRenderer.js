import Highway from '@dogstudio/highway'
import Images from '../binders/Images'
import Observer from '../binders/Observer'
import Iframes from '../binders/Iframes'
import ResizeManager from '../utils/ResizeManager'

export default class extends Highway.Renderer {
  onLeaveCompleted() {}

  onLeave() {
    Images.lazy.destroy()
    ResizeManager.removeQueue(this.resizeIframe)
  }

  onEnterCompleted() {
    Images.lazyload()

    const $view = this.wrap
    const $pictures = $view.querySelectorAll('.js-picture')
    this.$iframes = $view.querySelectorAll('iframe')

    Observer.init($pictures)

    this.bind()
    this.resizeIframe = ResizeManager.addQueue(() => this.bind())
  }

  bind() {
    Iframes.bind(this.$iframes)
  }
}
