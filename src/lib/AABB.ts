type AABB = {
  x: number
  y: number
  width: number
  height: number
}

export function checkAABB(r1: AABB, r2: AABB) {
  return !(
    r1.y + r1.height < r2.y ||
    r1.x > r2.x + r2.width ||
    r1.y > r2.y + r2.height ||
    r1.x + r1.width < r2.x
  )
}
