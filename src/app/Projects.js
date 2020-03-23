/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import projects from "./projectData";
import { markup } from "./util";
import { useTheme } from "./theme";
import hexToRgba from "hex-to-rgba";

const Projects = () => {
  const theme = useTheme();

  return (
    <div>
      <div
        css={css`
          position: relative;
          &::after {
            content: " ";
            position: absolute;
            height: 10px;
            width: 100%;
            bottom: -1px;
            background: ${theme.light};
            /* background: #f06; */
          }
          margin-bottom: 2em;
        `}
      >
        <div
          css={css`
            display: grid;
            @media screen and (min-width: 700px) {
              grid-template-columns: repeat(2, 1fr);
            }
            /* @media screen and (min-width: 1200px) {
              grid-template-columns: repeat(3, 1fr);
            } */
            grid-auto-rows: 1fr;
            grid-row-gap: 1em;
            // grid-column-gap: 1em;
            position: relative;
            & > * {
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
          `}
        >
          {projects.map(props => (
            <Project {...props} key={props.name} />
          ))}
          <Other />
        </div>
      </div>
      <div
        css={css`
          margin: 2em 0 1em 1em;
        `}
      ></div>
    </div>
  );
};

export default React.memo(Projects);

const Project = ({ name, url, img, desc }) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        img {
          transition: transform 0.1s;
        }
        &:hover img {
          transform: scale(1.1);
        }
      `}
    >
      <a
        href={url}
        css={css`
          flex-grow: 1;
          // border: 1px solid ${theme.light};
          // background: ${hexToRgba(theme.light, 0.25)};
          // border-radius: 0.25em;
          padding: 1em;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: inherit;
          &:hover {
            text-decoration: none;
          }
        `}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span
          css={css`
            flex-grow: 1;
            align-items: center;
            display: flex;
          `}
        >
          <img
            css={css`
              display: block;
              width: 100%;
            `}
            src={img}
            alt={name}
          />
        </span>
        {desc && (
          <span
            css={css`
              flex-basis: 2em;
              display: flex;
              justify-content: flex-end;
              flex-direction: column;
            `}
          >
            <span
              css={css`
                flex-shrink: 1;
                // text-align: center;
                // font-size: 0.9rem;
              `}
              {...markup(desc)}
            ></span>
          </span>
        )}
      </a>
    </div>
  );
};

const Other = () => {
  const theme = useTheme();

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <div>
        <h2
          css={css`
            font-size: 1.2rem;
            // font-family: ${theme.headingFontFamily};
            font-weight: 500;
          `}
        >
          Other projects
        </h2>
        <div>
          <ul>
            <li>
              <a
                href="https://slikts.github.io/js-equality-game/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>JavaScript equality table game</strong>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/slikts/gh-minimap#readme"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub minimap extension
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
