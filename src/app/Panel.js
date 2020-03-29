/** @jsx jsx */
// import React from "react";
import { jsx, css, keyframes } from "@emotion/core";
import hexToRgba from "hex-to-rgba";

import { useTheme } from "./theme";
import { cssVar } from "./util";

const Panel = ({
  children,
  title,
  bg,
  bg2,
  color,
  hideTitle,
  next,
  i,
  prevBg,
  prevColor,
  refs,
  minHeight = "auto",
  id,
  wide = false
}) => {
  const theme = useTheme();

  const arrSize = 20;

  const jump = keyframes`
    0% { bottom: ${-arrSize / 2}px; }
    12% { bottom: ${-arrSize}px; }
    24% { bottom: ${-arrSize / 2}px; }
  `;

  const menuStyle = css`
    background: ${prevBg};
    fill: ${prevColor};
    color: ${prevColor};
    a {
      color: ${prevColor || color};
    }
    width: 100%;
    height: var(--panelHeightPx);
    position: absolute;
    top: 0;
    &[data-state="active"] {
      position: fixed;
      top: 0;
    }
    &[data-state="firstNext"],
    &[data-state="next"] {
      position: fixed;
      bottom: calc(${next} * var(--panelHeightPx) + ${theme.menuMargin}px);
      top: auto;
    }
    &[data-state="firstNext"],
    &[data-state="next"] {
      font-size: ${theme.headingSize - 10}px;
    }
    &[data-state="outOfView"] {
      // bottom: ${theme.menuMargin}px;
      bottom: 0;
      top: auto;
      [data-hide] {
        opacity: 0;
      }
    }

    [data-hide] {
      transition: opacity 0.1s;
    }
    &[data-state="firstNext"] [data-hide],
    &[data-state="next"] [data-hide],
    &[data-state="visible"] [data-hide] {
      opacity: 0;
    }
    // &[data-state="firstNext"]::before {
    //   content: " ";
    //   position: absolute;
    //   width: 100%;
    //   height: 100%;
    //   background: linear-gradient(
    //     0,
    //     ${hexToRgba(prevBg || bg, 1)} 0%,
    //     ${hexToRgba(prevBg || bg, 0)} 50%
    //   );
    //   bottom: 100%;
    //   z-index: -1;
    // }

    font-size: ${theme.headingSize}px;

    transition: font-size 0.1s;

    z-index: ${next + 1};

    ${i > 0 &&
      css`
        &::after {
          content: " ";
          position: absolute;
          width: ${arrSize}px;
          height: ${arrSize}px;
          border-right: ${arrSize}px solid transparent;
          border-left: ${arrSize}px solid transparent;
          border-top: ${arrSize}px solid ${prevBg};
          box-sizing: border-box;
          left: calc(50% - ${arrSize}px);
          bottom: -${arrSize / 2}px;
          transition: bottom 0.5s;
          visibility: hidden;
          animation: ${jump} 2s infinite;
          animation-delay: ${i / 6}s;
        }
        &[data-state="firstNext"]::after,
        &[data-state="next"]::after {
          visibility: visible;
        }
        &[data-state="visible"]::after,
        &[data-state="active"]::after {
          bottom: 0;
        }
        ${i === 3 &&
          css`
            &::before {
              content: " ";
              position: absolute;
              width: 100%;
              height: ${theme.menuMargin}px;
              background: ${theme.dark};
              top: 100%;
            }
            &[data-state="active"]::before {
              display: none;
            }
          `}
      `}
  `;

  return (
    <div
      id={id}
      css={css`
        background: ${bg};
        ${bg2 &&
          css`
            background-image: linear-gradient(to bottom, ${bg2}, ${bg});
          `}
        color: ${color};
        min-height: ${minHeight};
        padding: 2em 0 0;
        position: relative;
      `}
      ref={refs.body}
    >
      <div css={menuStyle} ref={refs.header} className="init">
        <div
          css={css`
            width: var(--contentWidth);
            height: var(--panelHeightPx);
            margin: auto;
            display: flex;
            align-items: center;
            position: relative;
            justify-content: center;
          `}
        >
          {!hideTitle && (
            <h2
              css={css`
                font-family: ${theme.headingFontFamily};
                font-weight: ${theme.headingFontWeight};
                font-size: inherit;
                text-transform: uppercase;
                position: relative;
                top: 0.075em;
                z-index: 10;
              `}
            >
              <a
                css={css`
                  &:hover {
                    text-decoration: none;
                  }
                `}
                href={`#${id}`}
                onClick={e => {
                  e.preventDefault();
                  const hash = `#${id}`;
                  document.querySelector(hash).scrollIntoView({
                    block: `start`,
                    behavior: `smooth`
                  });
                  window.history.replaceState("", "", hash);
                }}
              >
                {title}
              </a>
            </h2>
          )}
        </div>
      </div>
      <div>
        <div
          css={css`
            margin: auto;
            width: ${wide ? "100%" : `var(--contentWidth)`};
            padding: ${wide ? 0 : "var(--panelHeightPx)"} 0 1rem;
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Panel;
