/** @jsx jsx */
import { useRef, useEffect } from "react";
import { jsx } from "@emotion/core";
import { setupAnimation } from "../flair";

const Flair = () => {
  const ref = useRef();

  useEffect(() => {
    setupAnimation(ref.current);
  }, []);

  return <div ref={ref}></div>;
};

export default Flair;
