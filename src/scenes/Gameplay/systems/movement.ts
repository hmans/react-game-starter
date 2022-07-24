import { ECS } from "../state"

const withVelocity = ECS.world.archetype("velocity", "transform").entities

export const movement = (dt: number) => {
  for (const { transform, velocity, bounds } of withVelocity) {
    /*
    We're adding a 2D vector to a 3D position, so instead of going
    through all the trouble of cloning and scaling vectors, let's
    just update the x and y components individually.
    */

    transform.position.x += velocity.x * dt
    transform.position.y += velocity.y * dt
  }
}
