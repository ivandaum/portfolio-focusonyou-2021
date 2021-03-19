import Highway from '@dogstudio/highway'
import Images from '../binders/Images'

export default class extends Highway.Renderer {
  onLeaveCompleted() {}

  onLeave() {
    Images.lazy.destroy()
  }

  onEnterCompleted() {
    Images.lazyload()
  }
}
