import segmentize from "./segmentize"
import letters from "../data/alphabet"

const { u } = letters

it(``, () => {
  const { segmentized } = segmentize(u)
  expect(segmentized.length).toBe(u.trim().split(/\n/).length)
})
