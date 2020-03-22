import { html } from "lit-html"
import { css } from "emotion"

export const svg = (
  border = `#000000`,
  background = `#FFFFFF`,
) => `<svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px">,
<defs>,
  <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">,
    <feOffset result="offsetOut" in="SourceAlpha" dx="0" dy="1"/>,
    <feGaussianBlur result="blurOut" in="offsetOut" stdDeviation="1"/>,
    <feComponentTransfer result="opacityOut" in="blurOut">,
      <feFuncA type="linear" slope="0.3"/>,
    </feComponentTransfer>,
    <feBlend in="SourceGraphic" in2="opacityOut" mode="normal"/>,
  </filter>,
</defs>,
<polygon fill="${border}" points="4,18.5 4,2.5 15.5,14 11,14 13,19 9.5,20.5 7.25,15.25" filter="url(#f1)"/>,
<polygon fill="${background}" points="5,16 7.5,13.5 10,19.125 11.625,18.5 9.5,13 13,13 5,5"/>,
</svg>`

export const cursor = (...args) =>
  `data:image/svg+xml;base64,${btoa(svg(...args))}`

export const Mouse = id =>
  html`<img id="Mouse-${id}" class="Mouse ${css`
    position: absolute;
    transform: scaleY(-1);
    left: -100%;
  `}" src="${cursor()}">`
