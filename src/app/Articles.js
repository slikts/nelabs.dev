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
      <div>
        {articles.map(props => (
          <Article {...props} key={props.name} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Articles);

const Article = ({ title, url, date }) => {
  return (
    <div>
      <h3>
        <a href={url} {...markup(title)}></a>
      </h3>
      <p title={date}>
        {formatDistanceToNow(parseISO(date), { addSuffix: true })}
      </p>
    </div>
  );
};
