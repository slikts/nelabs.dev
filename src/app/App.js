/** @jsx jsx */

import React, { useMemo, createRef, useEffect, useRef } from "react";
import { jsx, Global, css } from "@emotion/core";
import emotionReset from "emotion-reset";

import { useTheme } from "./theme";
import Panel from "./Panel";
import About from "./About";
import Flair from "./Flair";
import LogoBox from "./LogoBox";
import Projects from "./Projects";
import Articles from "./Articles";
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";

const App = () => {
  const theme = useTheme();
  const globalStyles = css`
    ${emotionReset}
    a {
      color: ${theme.link};
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    body {
      background: ${theme.bg};
      color: ${theme.light};
      font-family: "Open Sans", sans-serif;
    }
    html {
      // height: calc(100% - ${theme.menuMargin}px);
    }
    html,
    body,
    #root {
      height: 100%;
    }
    .init {
      transition: none !important;
    }
    * {
      box-sizing: border-box;
    }
  `;

  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <Accordion>
        <Panel
          title="Home"
          hideTitle
          bg={theme.bg}
          color={theme.light}
          logoColor={theme.hl2}
          minHeight="100%"
          wide
        >
          <Flair />
        </Panel>
        <Panel
          title="Articles"
          bg={theme.hl1}
          color={theme.light}
          logoColor={theme.palette[2]}
        >
          <Articles />
        </Panel>
        <Panel
          title="Projects"
          bg={theme.light}
          color={theme.dark}
          logoColor={theme.bg}
        >
          <Projects />
        </Panel>
        <Panel
          title="About"
          bg={theme.dark}
          color={theme.light}
          logoColor={theme.hl1}
          minHeight="100%"
        >
          <About />
        </Panel>
      </Accordion>
    </React.Fragment>
  );
};

export default App;

const Accordion = ({ children }) => {
  const theme = useTheme();
  const { panelHeight } = theme;
  const refs = useMemo(
    () =>
      Array.from({ length: children.length }, () => ({
        body: createRef(),
        header: createRef()
      })),
    [children.length]
  );

  useEffect(() => {
    let updating;
    setTimeout(() => {
      logoRef.current.classList.remove("init");
      refs.forEach(({ header }) => {
        header.current.classList.remove("init");
      });
    }, 100);

    const updateHeadings = () => {
      // console.clear();
      let firstNext = true;
      refs.forEach(({ body, header }, i) => {
        const {
          height: _height,
          top: _top
        } = body.current.getBoundingClientRect();
        const top = _top;
        const height = _height;
        let state;
        if (height + top - panelHeight <= 0) {
          state = "outOfView";
        } else if (height + top - 2 <= height) {
          state = "active";
          menuRef.current.style.color = children[i - 1]?.props.color;
          logoRef.current.style.background = children[i]?.props.logoColor;
        } else if (height + top - panelHeight <= height) {
          state = "preactive";
        } else if (
          window.innerHeight - 25 >=
          top + panelHeight * (refs.length - i)
        ) {
          state = "visible";
        } else {
          state = firstNext ? "firstNext" : "next";
          firstNext = false;
        }
        // console.log(state, height + top, height);

        header.current.dataset.state = state;
      });
      updating = false;
    };

    const updateScroll = () => {
      if (!updating) {
        window.requestAnimationFrame(updateHeadings);
        updating = true;
      }
    };
    updateScroll();
    window.addEventListener(`scroll`, updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.cancelAnimationFrame(updateHeadings);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const menuRef = useRef();
  const logoRef = useRef();

  return (
    <React.Fragment>
      {children.map((el, i) => {
        const prev = children[i - 1]?.props;
        return React.cloneElement(el, {
          next: children.length - i - 1,
          i,
          prevBg: prev?.bg,
          prevColor: prev?.color,
          refs: refs[i],
          key: i,
          panelHeight,
          id: el.props.title?.toLowerCase()
        });
      })}
      <div
        ref={menuRef}
        css={css`
          position: fixed;
          top: 0;
          width: 100%;
          transition: color 0.1s;
          z-index: 10;
        `}
      >
        <div
          ref={menuRef}
          css={css`
            display: flex;
            align-items: top;
            justify-content: space-between;
            width: ${theme.contentWidth}px;
            height: 0;
            > * {
              height: ${theme.panelHeight}px;
              display: flex;
              align-items: center;
            }
            margin: auto;
            a {
              color: inherit;
            }
          `}
        >
          <div>
            <LogoBox boxRef={logoRef} />
          </div>
          <div>
            <a
              href="https://github.com/slikts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon
                css={css`
                  path {
                    fill: currentColor;
                  }
                  height: ${iconSize}px;
                  width: ${iconSize}px;
                `}
              />
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const iconSize = 35;
