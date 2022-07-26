import { ECS } from "../state"

const { entities } = ECS.world.archetype("velocity", "transform")

export function movementSystem(dt: number) {
  for (const { transform, velocity } of entities) {
    transform.position.x += velocity.x * dt
    transform.position.y += velocity.y * dt
  }
}
