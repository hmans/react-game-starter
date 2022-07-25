import { IEntity, World } from "miniplex"
import { ITransformComponents } from "./transform"

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

export const translateAABB = (aabb: AABB, x: number, y: number): AABB => ({
  x1: aabb.x1 + x,
  y1: aabb.y1 + y,
  x2: aabb.x2 + x,
  y2: aabb.y2 + y
})

export type CollisionCallback = (
  entity: IEntity,
  other: IEntity,
  intersect: AABB
) => void

export interface ICollisionComponents {
  collision: {
    aabb: AABB
    onCollide?: CollisionCallback
  }
}

export const makeCollisionSystem = <
  T extends ICollisionComponents & ITransformComponents
>(
  world: World<T>
) => {
  const { entities } = world.archetype("collision")

  return () => {
    for (const entity of entities) {
      /* Check this entity's AABB against all other entities */
      for (const other of entities) {
        /* Don't collide objects with themselves */
        if (other === entity) {
          continue
        }

        /* Generate world-space AABBs */
        const aabb = translateAABB(
          entity.collision.aabb,
          entity.transform.position.x,
          entity.transform.position.y
        )

        const otherAabb = translateAABB(
          other.collision.aabb,
          other.transform.position.x,
          other.transform.position.y
        )

        /* Check overlap */
        if (
          aabb.x1 > otherAabb.x2 ||
          aabb.x2 < otherAabb.x1 ||
          aabb.y1 > otherAabb.y2 ||
          aabb.y2 < otherAabb.y1
        ) {
          continue
        }

        const intersect = AABB(
          Math.max(aabb.x1, otherAabb.x1),
          Math.max(aabb.y1, otherAabb.y1),
          Math.min(aabb.x2, otherAabb.x2),
          Math.min(aabb.y2, otherAabb.y2)
        )

        const delta = [intersect.x2 - intersect.x1, intersect.y2 - intersect.y1]

        // entity.transform.position.x -= Math.sign(entity.velocity.x) * delta[0]
        // entity.velocity.x *= -1

        if (entity.collision.onCollide) {
          entity.collision.onCollide(entity, other, intersect)
        }
      }
    }
  }
}
