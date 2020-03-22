/** @jsx jsx */
import React, { useRef, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import { setupAnimation } from "../flair";

const Flair = () => {
  const ref = useRef();

  useEffect(() => {
    setupAnimation(ref.current);
  }, []);

  return <div ref={ref}></div>;
};

export default Flair;
