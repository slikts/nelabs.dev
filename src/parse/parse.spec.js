import parse from "./parse"
import fixtures from "./fixtures"

it(`parses length`, () => {
  const { boxes } = parse(fixtures.shape)
  expect(boxes.length).toBe(3)
})

it(`parses u`, () => {
  const parsed = parse(fixtures.u)
  const box = parsed.boxes[2]
  expect(box.width).toBe(2)
  expect(box.height).toBe(2)
  expect(box.shape).toEqual([[1, 1], [1, 1]])
})
