import { css } from "emotion"
import { html } from "lit-html"

const Box = color => state =>
  html`<div class="Box ${css`
    position: relative;
    width: var(--box);
    height: var(--box);
    background-color: ${color};
    --sh: 1px;
    box-shadow: inset var(--sh) var(--sh) 0 0
      rgba(255, 255, 255, 0.15);
  `} ${
    state
      ? css`
          // border: 1px solid #f06;
        `
      : css`
          visibility: hidden;
        `
  }"></div>`

export default Box
