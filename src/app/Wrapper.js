import React from "react";

import App from "./App";
import { ThemeProvider, defaultTheme } from "./theme";
import { useWindowSize } from "./util";

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

export default React.memo(Wrapper);
