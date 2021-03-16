import Lazyloading from '../vendor/Lazyloading' // eslint-disable-line no-eval

const ImagesLoader = {
  lazy: null,
  $container: null,
  lazyload: () => {
    const offset = 0

    if (!ImagesLoader.$container) {
      ImagesLoader.$container = document.querySelector('main')
    }

    ImagesLoader.lazy = new Lazyloading({
      container: ImagesLoader.$container,
      load_delay: 0,
      elements_selector: 'img:not(.ignore-lazy)',
      thresholds: `${offset}px 0px ${offset}px 0px`,
      callback_enter: () => {},
      callback_loaded: (el) => ImagesLoader.onLoad(el),
      callback_error: (el) => {
        console.log('Error loading : ', el)
        ImagesLoader.onLoad(el)
      },
    })
  },

  onLoad: (el) => {
    el.classList.add('loaded')
  },
}

export default ImagesLoader
