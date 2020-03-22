import { css } from "emotion";
import "./app";

import { cursor } from "./components/Mouse";

document.documentElement.classList.add(css`
  cursor: url(${cursor()}) 5 5, default;
`);
