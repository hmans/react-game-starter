import { Box2, Vector2, Vector3 } from "three"
import { AABB, isColliding } from "../../../lib/aabb"
import {
  ballRadius,
  courtHeight,
  courtWidth,
  paddleHeight,
  paddleWidth
} from "../configuration"
import { ECS, increaseEnemyScore, increasePlayerScore } from "../state"

const { entities: balls } = ECS.world.archetype("ball")
const { entities: paddles } = ECS.world.archetype("paddle")

export function ballSystem() {
  for (const { transform, velocity } of balls) {
    const verticalRange = courtHeight / 2 - ballRadius
    const horizontalRange = courtWidth / 2 - ballRadius

    /* Check paddle collisions */
    const ballAABB = AABB(
      transform.position.x - ballRadius / 2,
      transform.position.y - ballRadius / 2,
      ballRadius,
      ballRadius
    )

    for (const { transform: paddleTransform, paddle } of paddles) {
      const paddleAABB = AABB(
        paddleTransform.position.x - paddleWidth / 2,
        paddleTransform.position.y - paddleHeight / 2,
        paddleWidth,
        paddleHeight
      )

      if (isColliding(ballAABB, paddleAABB)) {
        /* Move ball outside of paddle */
        if (velocity.x < 0) {
          transform.position.x =
            paddleAABB.x + paddleAABB.width + ballRadius / 2
        } else {
          transform.position.x = paddleAABB.x - ballRadius / 2
        }

        /* Bounce the ball */
        velocity.x = -velocity.x
      }
    }

    /* Collision with upper bounds - just bounce off the wall */
    if (transform.position.y < -verticalRange) {
      velocity.y *= -1
      transform.position.y = -verticalRange
    } else if (transform.position.y > verticalRange) {
      velocity.y *= -1
      transform.position.y = verticalRange
    }

    /* Horizontal collision with wall -- score! */
    if (transform.position.x < -horizontalRange) {
      velocity.x *= -1
      transform.position.x = -horizontalRange
      increaseEnemyScore()
    } else if (transform.position.x > horizontalRange) {
      velocity.x *= -1
      transform.position.x = horizontalRange
      increasePlayerScore()
    }
  }
}
