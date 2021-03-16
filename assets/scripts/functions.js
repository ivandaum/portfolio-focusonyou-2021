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
