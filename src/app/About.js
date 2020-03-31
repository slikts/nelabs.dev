/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { useTheme } from "./theme";

const About = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        @media screen and (max-width: 600px) {
          flex-direction: column;
        }
      `}
    >
      <section
        css={css`
          flex-grow: 1;
          display: flex;
          /* flex-direction: column; */
          /* @media screen and (min-width: 600px) {
          } */
          justify-content: center;
          flex-wrap: wrap;
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
          `}
        >
          <p
            css={css`
              --p: 250px;
              img {
                max-width: 90vw;
                max-height: 90vw;
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
            <img src="/assets/portrait.jpg" alt="Portrait" />
          </p>
          <p
            className="portrait-by"
            css={css`
              transition: opacity 0.1s ease-in;
              position: absolute;
              top: calc(50% - 1em);
              line-height: 1em;
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
        <section
          css={css`
            margin: 0 2rem;
          `}
        >
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
          <p>
            <a href="mailto:dabas@untu.ms">dabas@untu.ms</a>
          </p>
        </section>
      </section>
      <div
        css={css`
          display: none;
          flex-basis: 50%;
          word-wrap: break-word;
          p {
            margin: 1rem 0;
          }
          a {
            color: ${theme.link2};
          }
        `}
      >
        <p>
          Tooling advances can lead to{" "}
          <a href="https://en.wiktionary.org/wiki/qualitative_leap">
            qualitative leaps
          </a>{" "}
          in development, and that includes conceptual tools; it should be a
          general focus for developers to cultivate a judgement that allows
          recognizing these advances.
        </p>
        <p>
          JavaScript has relatively humble origins as a language, but it's
          uniquely situated as the language of the web, and popularity is
          relevant to tooling because the number of users drives the advancement
          of tools.
        </p>
        <p>
          I have a sustained goal to try to take a broader view about where
          technology is heading and how it applies to practical development, and
          hopefully it can be shared with others.
        </p>
      </div>
    </div>
  );
};

export default React.memo(About);
