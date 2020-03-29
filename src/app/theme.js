import { createContext, useContext } from "react";

import { colors } from "../data/palette";

export const defaultTheme = {
  bg: "#222e45",
  hl1: "#4b88a2",
  hl2: "#bb0a21",
  dark: "#252627",
  light: "#fff9fb",
  link: "#0366d6",
  link2: "#5196e3",
  palette: colors,
  headingFontFamily: `"Yanone Kaffeesatz", sans-serif`,
  headingFontWeight: 300,
  headingSize: 40,
  logoSize: 30,
  menuMargin: 25
};

const ThemeContext = createContext(defaultTheme);

export const { Provider: ThemeProvider } = ThemeContext;

export const useTheme = () => useContext(ThemeContext);
