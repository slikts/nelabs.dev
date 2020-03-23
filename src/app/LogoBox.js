/** @jsx jsx */
import React from "react";
import { jsx, css, keyframes } from "@emotion/core";

import { useTheme } from "./theme";

const LogoBox = ({ size = 25, color, boxRef, ...props }) => {
  const theme = useTheme();

  return (
    <div
      {...props}
      css={css`
        font-family: ${theme.headingFontFamily};
        font-weight: ${theme.headingFontWeight};
        font-size: ${theme.logoSize}px;
        @media screen and (max-width: 500px) {
          font-size: 1.5rem;
        }
      `}
    >
      <a
        href="/"
        css={css`
          color: inherit;
          &:hover {
            text-decoration: none;
          }
          user-select: none;
          .text {
            transition: opacity 0.05s;
          }
          &.notext .text {
            opacity: 0;
          }
        `}
        onClick={e => {
          e.preventDefault();
          document.querySelector(`body`).scrollIntoView({
            block: `start`,
            behavior: `smooth`
          });
        }}
      >
        <Boxes boxRef={boxRef} size={size} duration={2} color={color} />
        <span className="text">nelabs.dev</span>
      </a>
    </div>
  );
};

export default React.memo(LogoBox);

const Boxes = props => (
  <div
    ref={props.boxRef}
    css={css`
      animation: ${spin} ${props.duration * 4}s linear infinite;
      width: ${props.size}px;
      height: ${props.size}px;
      transition: background 0.2s;
      background: #bb0a21;
      display: inline-block;
      margin-right: 0.7rem;
      vertical-align: middle;
    `}
    className="init"
  >
    <Box {...props} />
    <Box rotation={90} {...props} />
    <Box rotation={180} {...props} />
    <Box rotation={270} {...props} />
  </div>
);

const Box = ({ size, rotation = 0, duration }) => {
  const count = rotation / 90;

  return (
    <div
      css={css`
        height: ${size}px;
        width: ${size}px;
        display: inline-block;
        border-left: ${size / 2}px solid transparent;
        border-right: ${size / 2}px solid transparent;
        border-top: ${size / 2}px solid rgba(255, 255, 255, 0.25);
        border-bottom: ${size / 2}px solid rgba(0, 0, 0, 0.15);
        position: absolute;
        transform: rotate(${rotation}deg);
        animation: ${fade} ${duration * 4}s linear infinite;
        animation-delay: ${count * -duration}s;
        opacity: 0;
        &:after {
          content: " ";
          width: ${size}px;
          height: ${size}px;
          box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.2);
          position: absolute;
          top: ${size / -2}px;
          left: ${size / -2}px;
        }
      `}
    ></div>
  );
};

const fade = keyframes`
  0%   { opacity: 0; }
  25% { opacity: 1; }
  50% { opacity: 0; }
`;
const spin = keyframes`
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(270deg);
  }
`;
