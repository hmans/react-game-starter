export type Rect = {
  x1: number
  y1: number
  x2: number
  y2: number
}

export const Rect = (x1: number, y1: number, x2: number, y2: number): Rect => ({
  x1,
  y1,
  x2,
  y2
})
