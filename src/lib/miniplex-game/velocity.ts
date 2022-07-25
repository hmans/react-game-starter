import { World } from "miniplex"
import { Vector2 } from "three"
import { ITransformComponents } from "./transform"

export interface IVelocityComponents {
  velocity?: Vector2
}

export const makeMovementSystem = <
  T extends IVelocityComponents & ITransformComponents
>(
  world: World<T>
) => {
  const { entities } = world.archetype("velocity", "transform")

  return (dt: number) => {
    for (const { transform, velocity } of entities) {
      transform.position.x += velocity.x * dt
      transform.position.y += velocity.y * dt
    }
  }
}
