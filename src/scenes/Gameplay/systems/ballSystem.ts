import { ballRadius, paddleHeight, paddleWidth } from "../configuration"
import { ECS, increaseEnemyScore, increasePlayerScore } from "../state"

const { entities: balls } = ECS.world.archetype("ball")
const { entities: paddles } = ECS.world.archetype("isPaddle")

export function ballSystem() {
  for (const { transform, velocity, ball } of balls) {
    const { bounds } = ball

    // const ballAABB = AABB(
    //   transform.position.x - ballRadius,
    //   transform.position.y - ballRadius,
    //   ballRadius * 2,
    //   ballRadius * 2
    // )

    /* Vertical collision */
    if (transform.position.y < bounds.min.y) {
      velocity.y = -velocity.y
      transform.position.y = bounds.min.y
    } else if (transform.position.y > bounds.max.y) {
      velocity.y = -velocity.y
      transform.position.y = bounds.max.y
    }

    /* Horizontal collision with wall -- score! */
    if (transform.position.x < bounds.min.x) {
      velocity.x = -velocity.x
      transform.position.x = bounds.min.x
      increaseEnemyScore()
    } else if (transform.position.x > bounds.max.x) {
      velocity.x = -velocity.x
      transform.position.x = bounds.max.x
      increasePlayerScore()
    }

    /* Check paddle collisions */
    // for (const paddle of paddles) {
    //   const paddleAABB = AABB(
    //     paddle.transform.position.x - paddleWidth / 2,
    //     paddle.transform.position.y - paddleHeight / 2,
    //     paddleWidth,
    //     paddleHeight
    //   )

    //   if (checkAABB(ballAABB, paddleAABB)) {
    //     velocity.x = -velocity.x
    //   }
    // }
  }
}
