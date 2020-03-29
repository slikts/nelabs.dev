import React from "react";

import App from "./App";
import { ThemeProvider, defaultTheme } from "./theme";
import "./main.css";

const Wrapper = () => {
  return (
    <ThemeProvider value={defaultTheme}>
      <App />
    </ThemeProvider>
  );
};

export default Wrapper;
