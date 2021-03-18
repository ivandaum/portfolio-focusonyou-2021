import Highway from '@dogstudio/highway'
import Images from '../binders/Images'

class DefaultRenderer extends Highway.Renderer {
  onLeaveCompleted() {}

  onLeave() {
    Images.lazy.destroy()
  }

  onEnterCompleted() {
    Images.lazyload()
  }
}

export default DefaultRenderer
