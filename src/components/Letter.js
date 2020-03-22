import { css } from "emotion"
import { html } from "lit-html"
import Shape from "./Shape"

const Letter = ({ boxes, width, height }, mirror) => ({
  width,
  height,
  html: html`<div class="Letter ${css`
    position: relative;
    margin-right: var(--box);
    width: calc(var(--box) * ${width});
    height: calc(var(--box) * ${height});
    flex-shrink: 0;
  `}"
    data-width="${width}"
    data-height="${height}"
  >
  <div class="Letter-container ${css`
    position: relative;
    width: 100%;
    height: 100%;
  `}">
    ${boxes.map(box => Shape(box))}
    </div>
    <div class="Cover ${css`
      background: rgb(var(--bg));
      position: absolute;
      width: 100%;
      height: var(--box);
      opacity: 0;
    `} ${
    mirror
      ? css`
          top: 0;
        `
      : css`
          bottom: 0;
        `
  }"></div>
</div>`,
})

export default Letter
