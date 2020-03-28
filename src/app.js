import React from "react";
import { render, hydrate } from "react-dom";
import Wrapper from "./app/Wrapper";

const rootElement = document.querySelector("#root");

if (rootElement.hasChildNodes()) {
  hydrate(<Wrapper />, rootElement);
} else {
  render(<Wrapper />, rootElement);
}
