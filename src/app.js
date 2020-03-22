import React from "react";
import App from "./app/App";
import { ThemeProvider, defaultTheme } from "./app/theme";

import ReactDOM from "react-dom";

ReactDOM.render(
  <ThemeProvider value={defaultTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
