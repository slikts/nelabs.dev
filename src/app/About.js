/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const About = () => {
  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        svg {
          display: block !important;
        }
        a {
          color: inherit;
        }
      `}
    >
      <div
        css={css`
          position: relative;
          img {
            transition: opacity 0.1s ease-in-out;
            transform: scale(1.2);
          }
          :hover img {
            opacity: 0.2;
            transform: scale(1.05);
          }
          :hover .portrait-by {
            opacity: 1;
            text-indent: 0;
          }
          @media screen and (max-width: 500px) {
            transform: scale(0.8);
          }
        `}
      >
        <p
          css={css`
            --p: 400px;
            img {
              width: var(--p);
              height: var(--p);
              // margin-top: -81px;
              // margin-left: -81px;
              transition-duration: 0.1s;
              transition-timing-function: ease-in-out;
              transition-property: opacity, transform;
            }
            overflow: hidden;
            clip-path: circle(50%);
          `}
        >
          <img src="./assets/portrait.jpg" alt="Portrait" />
        </p>
        <p
          className="portrait-by"
          css={css`
            transition: opacity 0.1s ease-in;
            position: absolute;
            top: 50%;
            width: 100%;
            opacity: 0;
            text-indent: -2000em;
            text-align: center;
          `}
        >
          Portrait by&nbsp;
          <a
            href="https://www.instagram.com/mazzerindraws/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>@mazzerindraws</b>
          </a>
        </p>
      </div>
      <section>
        <ul
          css={css`
            list-style: none;
          `}
        >
          <li>
            <a
              href="https://github.com/slikts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>github</b>.com/slikts
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/slikts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>twitter</b>.com/slikts
            </a>
          </li>
          <li>
            <a
              href="https://keybase.io/slikts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>keybase</b>.io/slikts
            </a>
          </li>
        </ul>
      </section>
      <section className="section-contact">
        <p>
          <a href="mailto:dabas@untu.ms">dabas@untu.ms</a>
        </p>
      </section>
    </section>
  );
};

export default React.memo(About);
