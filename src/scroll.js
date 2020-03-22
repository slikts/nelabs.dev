const headings = [...document.querySelectorAll(`h1.heading`)].map(
  heading => ({
    heading,
    arrow: heading.querySelector(`a.arrow`),
    up: heading.querySelector(`a.uparrow`),
    link: heading.querySelector(`a.link`),
    height: heading.getBoundingClientRect().height,
  }),
)

const projects = document.querySelector(`#projects .section-content`)
const headingWrapper = document.querySelector(`#about-heading`)
const headingHeight = headingWrapper.getBoundingClientRect().height
headingWrapper.style.height = `${headingHeight}px`

const borderSize = parseInt(
  window.getComputedStyle(headings[0].arrow).borderTopWidth,
  10,
)

let lastScroll = 0
let ticking = false
let offset = null

const updateHeading = ({ heading, link, arrow, height, up }) => {
  const { top } = heading.getBoundingClientRect()
  if (offset === null) {
    offset =
      window.innerHeight -
      headings[0].heading.offsetTop -
      headings[0].height
  }
  const ratio = Math.max(
    0,
    top / (window.innerHeight - offset - height),
  )
  const margin = 0.2
  link.style.fontSize = `${1 - margin + margin * (1 - ratio)}em`
  const size = Math.max(0, ratio * borderSize)
  arrow.style.setProperty(`--size`, `${size}px`)
  const upSize = Math.max(0, (1 - ratio) * borderSize)
  up.style.setProperty(`--size`, `${upSize}px`)
}

const updateScroll = () => {
  headings.forEach(updateHeading)
  const projectsRect = projects.getBoundingClientRect()
  const fix =
    projectsRect.bottom - window.innerHeight + headingHeight > 0
  const stat =
    window.innerHeight - projectsRect.top - headingHeight + 20 <= 0
  headingWrapper.classList.toggle(`fixed`, fix)
  headingWrapper.classList.toggle(`static`, stat)
  if (projectsRect.top - headingHeight <= 0) {
    if (!window.paused && window.playing) {
      window.paused = true
      window.playing.pause()
    }
  } else if (window.paused) {
    window.paused = false
    window.playing.play()
  }
}
updateScroll()

window.addEventListener(`scroll`, () => {
  lastScroll = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScroll(lastScroll)
      ticking = false
    })

    ticking = true
  }
})

document.querySelectorAll(`a[href^="#"]`).forEach(anchor => {
  anchor.addEventListener(`click`, e => {
    e.preventDefault()
    const hash = anchor.getAttribute(`href`)
    window.history.pushState(null, null, hash)
    document.querySelector(hash).scrollIntoView({
      block: `start`,
      behavior: `smooth`,
    })
  })
})
