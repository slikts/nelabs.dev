/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import projects from "./projectData";
import { markup } from "./util";

const Projects = () => {
  return (
    <div>
      <div>
        {projects.map(props => (
          <Project {...props} key={props.name} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Projects);

const Project = ({ name, url, img, desc }) => {
  return (
    <div>
      <a href={url}>
        <img src={img} alt={name} />
      </a>
      <p {...markup(desc)}></p>
    </div>
  );
};
