import { css } from "emotion"
import { html } from "lit-html"
import { Circulator } from "circulator"
import Letter from "./Letter"
import parse from "../parse/parse"
import { getBoxSize } from "../util"

const randoms = Array.from({ length: 20 }, () => Math.random())
const seeds = () => new Circulator(randoms)

const Word = source => (text, mirror = false) => {
  const boxSize = getBoxSize()
  const letters = [...text].map(
    char =>
      char === ` `
        ? {
            width: 2,
            html: html`<div class="${css`
              width: ${boxSize * 2}px;
            `}"></div>`,
          }
        : Letter(parse(source[char], mirror, seeds()), mirror),
  )
  const width = letters
    .map(letter => letter.width)
    .reduce((a, b) => a + b)
  const height = Math.max(
    ...letters.map(letter => letter.height || 0),
  )
  return html`
  <div class="Word 
  Word-mirror-${mirror}
  ${
    mirror
      ? css`
          opacity: 1;
          align-items: flex-start;
        `
      : css`
          align-items: flex-end;
        `
  }
  ${css`
    display: flex;
    width: ${width * boxSize + (letters.length - 1) * boxSize}px;
  `}"
    data-width="${width}"
    data-height="${height}"
  >
  ${letters.map(letter => letter.html)}
  </div>`
}

export default Word
