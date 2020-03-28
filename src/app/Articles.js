/* eslint-disable jsx-a11y/anchor-has-content */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";

import articles from "./articleData";
import { markup } from "./util";

const Articles = () => {
  return (
    <div>
      <ol>
        {articles.map(props => (
          <Article {...props} key={props.url} />
        ))}
      </ol>
    </div>
  );
};

export default React.memo(Articles);

const Article = ({ title, url, date }) => {
  return (
    <li
      css={css`
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        &:last-child {
          border-bottom: none;
        }
      `}
    >
      <h3
        css={css`
          font-size: 1.25rem;
          a {
            color: #fff;
          }
        `}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          {...markup(title)}
        ></a>
      </h3>
      <p
        title={date}
        css={css`
          margin-top: 0.25rem;
          font-size: 0.8rem;
          color: #eee;
        `}
      >
        {formatDistanceToNow(parseISO(date), { addSuffix: true })}
      </p>
    </li>
  );
};
