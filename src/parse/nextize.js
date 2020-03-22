const nextize = segmented =>
  segmented.map((segments, y, lines) =>
    segments.map(segment => ({
      ...segment,
      next:
        lines[y + 1] &&
        lines[y + 1].find(
          ({ char, x1, x2 }) =>
            char === segment.char &&
            segment.x1 <= x2 &&
            x1 <= segment.x2,
        ),
    })),
  )

export default nextize
