/* eslint-disable import/prefer-default-export, no-console */

export const getBoxSize = () => {
  const name = `--box`
  const raw = window
    .getComputedStyle(document.body)
    .getPropertyValue(name)
  const value = parseInt(raw, 10)
  const result = Math.round(
    raw.endsWith(`vw`) ? window.innerWidth * 0.01 * value : value,
  )
  if (value !== result) {
    document.documentElement.style.setProperty(name, `${result}px`)
  }
  return result
}

export const log = Symbol(`log`)
export const logGroup = Symbol(`log group`)

Object.assign(Object.prototype, {
  [log](...args) {
    console.log(this, ...args)
    return this
  },
  [logGroup](label, collapsed = false) {
    return (...args) => {
      console[collapsed ? `groupCollapsed` : `group`](label)
      const result = this(...args)
      console.groupEnd()
      return result
    }
  },
})

export const play = Symbol(`play`)
export const of = Symbol(`of`)

Object.assign(Animation.prototype, {
  [play]() {
    this.play()
    return this.finished
  },
})

Animation[of] = effect => {
  const animation = new Animation(effect, document.timeline)
  animation.pause()
  return animation
}

export const getRandom = (_min, _max, random) => {
  const min = Math.ceil(_min)
  const max = Math.floor(_max)
  return Math.floor(random * (max - min + 1)) + min
}
