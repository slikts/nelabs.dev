const shape = ({ width, group }) =>
  group.map(({ x1, x2 }) =>
    Array.from(
      { length: width },
      (_, i) => (i <= x2 && i >= x1 ? 1 : 0),
    ),
  )

export default shape
