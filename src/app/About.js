/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

const About = () => {
  return (
    <section>
      <section className="section-portrait">
        <div className="portrait-container">
          <div id="portrait-image">
            <img src="./assets/portrait.jpg" alt="Portrait" />
          </div>
          <p className="portrait-by">
            Portrait by
            <a
              href="https://www.instagram.com/mazzerindraws/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>@mazzerindraws</b>
            </a>
          </p>
        </div>
      </section>
      <section className="section-social">
        <ul>
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
