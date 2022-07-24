import { ECS } from "../state"

const withVelocity = ECS.world.archetype("velocity", "transform").entities

export const movement = (dt: number) => {
  for (const { transform, velocity, area } of withVelocity) {
    /*
    We're adding a 2D vector to a 3D position, so instead of going
    through all the trouble of cloning and scaling vectors, let's
    just update the x and y components individually.
    */

    transform.position.x += velocity.x * dt
    transform.position.y += velocity.y * dt

    /*
    If an area component is present, check if the entity has left the
    area; if so, reverse its velocity.
    */
    if (area) {
      /* Horizontal collision */
      if (transform.position.x < area.min.x) {
        velocity.x = -velocity.x
        transform.position.x = area.min.x
      } else if (transform.position.x > area.max.x) {
        velocity.x = -velocity.x
        transform.position.x = area.max.x
      }

      /* Vertical collision */
      if (transform.position.y < area.min.y) {
        velocity.y = -velocity.y
        transform.position.y = area.min.y
      } else if (transform.position.y > area.max.y) {
        velocity.y = -velocity.y
        transform.position.y = area.max.y
      }
    }
  }
}
