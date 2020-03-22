const tuple = (...args) => JSON.stringify(args)

const segmentize = text => {
  const lines = text
    .split(/\n/)
    .map(line => line.trimRight())
    .filter(line => line)
  return {
    width: Math.max(...lines.map(({ length }) => length)),
    height: lines.length,
    segmentized: lines
      .map(line => line.match(/(.)\1*/g))
      .map((segments, y) =>
        segments
          .map((chars, i) => ({
            char: chars[0],
            length: chars.length,
            x: segments.slice(0, i).join(``).length,
          }))
          .filter(({ char }) => char !== ` `)
          .map(({ char, length, x }, i) => ({
            char,
            x1: x,
            x2: x + length - 1,
            id: tuple(x, y),
            i,
            y,
          })),
      ),
  }
}

export default segmentize
