import shape from "./shape"

const box = {
  width: 3,
  group: [
    {
      x1: 0,
      x2: 2,
    },
    {
      x1: 0,
      x2: 0,
    },
  ],
}

it(`parses coords`, () => {
  expect(shape(box)).toEqual([[1, 1, 1], [1, 0, 0]])
})
