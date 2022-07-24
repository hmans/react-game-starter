import { ECS } from "../state"

const { entities } = ECS.world.archetype("ball")

export function ball() {
  for (const { transform, velocity, ball } of entities) {
    const { bounds } = ball
    /*
    If an area component is present, check if the entity has left the
    area; if so, reverse its velocity.
    */
    if (bounds) {
      /* Horizontal collision */
      if (transform.position.x < bounds.x1) {
        velocity.x = -velocity.x
        transform.position.x = bounds.x1
      } else if (transform.position.x > bounds.x2) {
        velocity.x = -velocity.x
        transform.position.x = bounds.x2
      }

      /* Vertical collision */
      if (transform.position.y < bounds.y1) {
        velocity.y = -velocity.y
        transform.position.y = bounds.y1
      } else if (transform.position.y > bounds.y2) {
        velocity.y = -velocity.y
        transform.position.y = bounds.y2
      }
    }
  }
}
