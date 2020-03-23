import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";
import { ThemeProvider, defaultTheme } from "./app/theme";
import { useWindowSize } from "./app/util";

const Wrapper = () => {
  const { width, height } = useWindowSize();

  let { panelHeight } = defaultTheme;

  if (height < 400) {
    panelHeight = 35;
  }
  if (height < 700) {
    panelHeight = 50;
  }

  const theme = {
    ...defaultTheme,
    contentWidth: Math.min(width - 50, defaultTheme.contentWidth),
    panelHeight
  };

  return (
    <ThemeProvider value={theme}>
      <App />
    </ThemeProvider>
  );
};

ReactDOM.render(<Wrapper />, document.getElementById("root"));
