import { useEffect, useState } from "react";

export const markup = __html => ({ dangerouslySetInnerHTML: { __html } });

export const cssVar = name =>
  +getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);
