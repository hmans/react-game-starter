import { ECS, increaseEnemyScore, increasePlayerScore } from "../state"

const { entities } = ECS.world.archetype("ball")

export function ballSystem() {
  for (const { transform, velocity, ball } of entities) {
    const { bounds } = ball
    /*
    If an area component is present, check if the entity has left the
    area; if so, reverse its velocity.
    */

    /* Vertical collision */
    if (transform.position.y < bounds.y) {
      velocity.y = -velocity.y
      transform.position.y = bounds.y
    } else if (transform.position.y > bounds.y + bounds.height) {
      velocity.y = -velocity.y
      transform.position.y = bounds.y + bounds.height
    }

    /* Horizontal collision with wall -- score! */
    if (transform.position.x < bounds.x) {
      velocity.x = -velocity.x
      transform.position.x = bounds.x
      increaseEnemyScore()
    } else if (transform.position.x > bounds.x + bounds.width) {
      velocity.x = -velocity.x
      transform.position.x = bounds.x + bounds.width
      increasePlayerScore()
    }
  }
}
