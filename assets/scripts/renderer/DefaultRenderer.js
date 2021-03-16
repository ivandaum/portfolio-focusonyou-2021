import Highway from '@dogstudio/highway'
import ImagesLoader from '../utils/ImagesLoader'

class DefaultRenderer extends Highway.Renderer {
  onLeaveCompleted() {}

  onLeave() {
    ImagesLoader.lazy.destroy()
  }

  onEnterCompleted() {
    ImagesLoader.lazyload()
  }
}

export default DefaultRenderer
