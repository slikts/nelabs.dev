import { css } from "emotion"
import { html } from "lit-html"
import Word from "./Word"
import alphabet from "../data/alphabet"
import shapes from "../data/shapes"
import { Mouse } from "./Mouse"

const AlphabetWord = Word(Object.assign(alphabet, shapes))

const overlayStyle = css`
  overflow: hidden;
  display: flex;
  justify-content: center;
`

let count = 0
// eslint-disable-next-line no-plusplus
const MirrorWord = (text, id = count++) => html`
<div class="MirrorWord ${css`
  position: absolute;
  width: 100%;
`}">
  <div class="Word-overlay ${overlayStyle}"
  @mousemove="${({ layerX, layerY }) => {
    const mouse = document.querySelector(`#Mouse-${id}`)
    mouse.style.left = `${layerX - 5}px`
    mouse.style.bottom = `${layerY - 5}px`
  }}"
  @mouseleave="${() => {
    document.querySelector(`#Mouse-${id}`).style.display = `none`
  }}"
  @mouseenter="${() => {
    document.querySelector(`#Mouse-${id}`).style.display = `block`
  }}"
  >${AlphabetWord(text)}</div>
  <div class="Word-overlay-mirror ${css`
    position: relative;
  `} ${overlayStyle}">
    ${AlphabetWord(text, true)}
    ${Mouse(id)}
  </div>
</div>
`

export default MirrorWord
