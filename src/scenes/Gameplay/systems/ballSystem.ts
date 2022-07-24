import { checkAABB } from "../../../lib/AABB"
import { ECS, increaseEnemyScore, increasePlayerScore } from "../state"

const { entities: balls } = ECS.world.archetype("ball")
const { entities: paddles } = ECS.world.archetype("isPaddle")

export function ballSystem() {
  for (const { transform, velocity, ball } of balls) {
    const { bounds } = ball

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

    /* Check paddle collisions */
    for (const paddle of paddles) {
    }
  }
}
