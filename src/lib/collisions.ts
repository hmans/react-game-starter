import { IEntity, World } from "miniplex"

export type AABB = {
  x1: number
  y1: number
  x2: number
  y2: number
}

export const AABB = (x1: number, y1: number, x2: number, y2: number): AABB => ({
  x1,
  y1,
  x2,
  y2
})

export type CollisionCallback = (other: IEntity) => void

export type ICollisionComponent = {
  aabb: AABB
  onCollide?: CollisionCallback
}

export const collisionSystem = (world: World, componentName: string) => {
  const { entities } = world.archetype(componentName)

  return () => {
    for (const { collision } of entities) {
      /* Collide the rest of the f'ing owl */
    }
  }
}
