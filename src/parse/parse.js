import shape from "./shape"
import segmentize from "./segmentize"
import nextize from "./nextize"
import { mirrorPalette, normalPalette } from "../data/palette"
import { getRandom } from "../util"

const isSemi = xs =>
  new Set(xs.map(x => JSON.stringify(x))).size === 1

const isFull = xs => xs[0].length === xs.length

const parse = (text, mirror = false, seeds) => {
  const { segmentized, width, height } = segmentize(text)
  const nextized = nextize(segmentized)
  const nexts = nextized.map(row =>
    row
      .map(({ next }) => next)
      .filter(y => y)
      .map(({ id }) => id),
  )

  const roots = nextized.map(segments =>
    segments.filter(({ id }) => !nexts.some(row => row.includes(id))),
  )
  const getNext = (curr, acc = []) => {
    const result = acc.concat(curr)
    if (!curr.next) {
      return result
    }
    return getNext(nextized[curr.next.y][curr.next.i], result)
  }
  const palette = mirror ? mirrorPalette : normalPalette
  const groups = roots.map(row => row.map(root => getNext(root)))
  const boxes = groups.map(row =>
    row
      .map(group => ({
        ...group.reduce((p, c) => ({
          x1: Math.min(p.x1, c.x1),
          x2: Math.max(p.x2, c.x2),
        })),
        y1: group[0].y,
        y2: group[group.length - 1].y,
        group,
      }))
      .map(({ x1, x2, y1, y2, group }) => ({
        x: x1,
        y: y1,
        width: x2 - x1 + 1,
        height: y2 - y1 + 1,
        color: palette.next(),
        group: group.map(segment => ({
          x1: segment.x1 - x1,
          x2: segment.x2 - x1,
        })),
      }))
      .map(box => ({
        ...box,
        shape: shape(box),
      }))
      .map(box => {
        const semi = isSemi(box.shape)
        const full = semi && isFull(box.shape)
        return {
          ...box,
          turns: getRandom(
            0,
            +full // eslint-disable-line no-nested-ternary
              ? 0
              : +semi
                ? 1
                : 3,
            seeds.next(),
          ),
        }
      }),
  )
  const mirrorBoxes = mirror
    ? boxes
        .map(row =>
          row
            .map(box => ({
              ...box,
              shape: box.shape.reverse(),
              y: height - box.y - box.height,
            }))
            .reverse(),
        )
        .reverse()
    : null

  return {
    boxes: (mirrorBoxes || boxes).reduce((a, b) => a.concat(b), []),
    width,
    height,
  }
}

export default parse
