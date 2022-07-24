import { ECS } from "../state"

const { entities } = ECS.world.archetype("ball")

export function ballSystem() {
  for (const { transform, velocity, ball } of entities) {
    const { bounds } = ball
    /*
    If an area component is present, check if the entity has left the
    area; if so, reverse its velocity.
    */
    if (bounds) {
      /* Vertical collision */
      if (transform.position.y < bounds.y1) {
        velocity.y = -velocity.y
        transform.position.y = bounds.y1
      } else if (transform.position.y > bounds.y2) {
        velocity.y = -velocity.y
        transform.position.y = bounds.y2
      }

      /* Horizontal collision with wall -- score! */
      if (transform.position.x < bounds.x1) {
        velocity.x = -velocity.x
        transform.position.x = bounds.x1
        console.log("ENEMY SCORES!")
      } else if (transform.position.x > bounds.x2) {
        velocity.x = -velocity.x
        transform.position.x = bounds.x2
        console.log("PLAYER SCORES!")
      }
    }
  }
}
