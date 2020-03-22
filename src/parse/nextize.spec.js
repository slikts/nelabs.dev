import nextize from "./nextize"
import segmentize from "./segmentize"
import letters from "./fixtures"

const { u } = letters

it(``, () => {
  const nexts = nextize(segmentize(u).segmentized.slice(0, 6))
  expect(nexts[1][0].next.id).toBe(`[0,2]`)
  expect(nexts[4][1].next).toBe(undefined)
})
