import { css } from "emotion"
import { html } from "lit-html"
import Box from "./Box"

const Shape = ({ shape, x, y, height, width, color, turns }) => html`
  <div class="Shape ${css`
    position: absolute;
    top: calc(var(--box) * ${y});
    left: calc(var(--box) * ${x});
  `}"
  data-x="${x}"
  data-y="${y}"
  data-height="${height}"
  data-width="${width}"
  data-turns="${+turns}"
  >${shape.map(
    segment =>
      html`<div class=${css`
        display: flex;
      `}>${segment.map(Box(color))}</div>`,
  )}</div>
`

export default Shape
