/** @jsx jsx */
import { useRef, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import { setupAnimation } from "../flair";
// import { useTheme } from "./theme";

const Flair = () => {
  const ref = useRef();
  // const theme = useTheme();

  useEffect(() => {
    const container = ref.current;
    setupAnimation(container);
    const { offsetWidth, offsetHeight } = container;
    const max = 800;

    const handler = () => {
      const min = Math.min(offsetWidth, offsetHeight);

      if (min < max) {
        container.querySelector("div").style.transform = `scale(${min / max})`;
      }
    };

    handler();
    window.addEventListener("resize", handler);

    return () => void window.removeEventListener("resize", handler);
  }, []);

  return (
    <div
      ref={ref}
      css={css`
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .Animation {
          /* display: none; */
          flex-shrink: 1;
        }
      `}
    ></div>
  );
};

export default Flair;
