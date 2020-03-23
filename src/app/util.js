import { useEffect, useState } from "react";

export const markup = __html => ({ dangerouslySetInnerHTML: { __html } });

export const useWindowSize = () => {
  const { innerHeight: height, innerWidth: width } = window;
  const [size, setSize] = useState({ width, height });

  useEffect(() => {
    const handler = () => {
      const { innerHeight: height, innerWidth: width } = window;

      if (size.width !== width || size.height !== height) {
        setSize({ width, height });
      }
    };
    window.addEventListener("resize", handler);

    return () => void window.removeEventListener("resize", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSize]);

  return size;
};
