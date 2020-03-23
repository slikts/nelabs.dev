import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";
import { ThemeProvider, defaultTheme } from "./app/theme";
import { useWindowSize } from "./app/util";

const Wrapper = () => {
  const { width } = useWindowSize();

  console.log(width, Math.min(width - 50, defaultTheme.contentWidth));

  const theme = {
    ...defaultTheme,
    contentWidth: Math.min(width - 50, defaultTheme.contentWidth)
  };

  return (
    <ThemeProvider value={theme}>
      <App />
    </ThemeProvider>
  );
};

ReactDOM.render(<Wrapper />, document.getElementById("root"));
