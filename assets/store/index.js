export default {
  state: {
    windowWidth: 0,
    windowHeight: 0,
  },

  $commit(methodName, value) {
    this[methodName](state, value)
  },
}
