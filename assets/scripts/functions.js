export function getMousePosition(e) {
  let x = e.x
  let y = e.y

  if (e.changedTouches && e.changedTouches.length) {
    x = e.changedTouches[0].pageX
    y = e.changedTouches[0].pageY
  }

  if (e.x === undefined) {
    x = e.pageX
    y = e.pageY
  }

  return { x, y }
}

export const observe = (target, callback, options = {}) => {
  const observer = new IntersectionObserver((changes) => {
    const [{ isIntersecting }] = changes
    callback(isIntersecting)
  }, options)
  observer.observe(target)
}

export const range = (input, min, max) => ((input - min) * 100) / (max - min)

export const lerp = (v0, v1, t) => (1 - t) * v0 + t * v1
