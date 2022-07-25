import { IEntity, RegisteredEntity, World } from "miniplex"

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

export interface ICollisionComponents {
  collision: {
    aabb: AABB
    onCollide?: CollisionCallback
  }
}

export const makeCollisionSystem = <T extends ICollisionComponents>(
  world: World<T>
) => {
  const { entities } = world.archetype("collision")

  return () => {
    for (const { collision } of entities) {
      /* Check this entity's AABB against all other entities */
      for (const other of entities) {
        if (other.collision === collision) {
          continue
        }

        const aabb = collision.aabb
        const otherAabb = other.collision.aabb

        if (aabb.x1 > otherAabb.x2 || aabb.x2 < otherAabb.x1) {
          continue
        }

        if (aabb.y1 > otherAabb.y2 || aabb.y2 < otherAabb.y1) {
          continue
        }

        if (collision.onCollide) {
          collision.onCollide(other)
        }
      }
    }
  }
}
