import { useFrame } from "@react-three/fiber"
import { AABB, isColliding } from "../../../lib/aabb"
import {
  ballRadius,
  courtHeight,
  courtWidth,
  paddleHeight,
  paddleWidth
} from "../configuration"
import {
  increaseEnemyScore,
  increasePlayerScore,
  randomizeBallRotation,
  setIntensity,
  useGameplayStore
} from "../state"

export const BallSystem = () => {
  const { ball, ballDirection, ballSpeed, player, enemy } = useGameplayStore()

  useFrame((_, dt) => {
    if (!ball) return

    /* Move ball */
    {
      ball.position.x += ballDirection.x * ballSpeed * dt
      ball.position.y += ballDirection.y * ballSpeed * dt
    }

    /* Collide with paddles */
    {
      /* Check paddle collisions */
      const ballAABB = AABB(
        ball.position.x - ballRadius / 2,
        ball.position.y - ballRadius / 2,
        ballRadius,
        ballRadius
      )

      const paddles = [player, enemy]
      for (const paddle of paddles) {
        const paddleAABB = AABB(
          paddle.position.x - paddleWidth / 2,
          paddle.position.y - paddleHeight / 2,
          paddleWidth,
          paddleHeight
        )

        if (isColliding(ballAABB, paddleAABB)) {
          /* Move ball outside of paddle */
          if (ballDirection.x < 0) {
            ball.position.x = paddleAABB.x + paddleAABB.width + ballRadius / 2
          } else {
            ball.position.x = paddleAABB.x - ballRadius / 2
          }

          /* Bounce the ball */
          ballDirection.x = -ballDirection.x

          randomizeBallRotation()
        }
      }
    }

    {
      const verticalRange = courtHeight / 2 - ballRadius
      const horizontalRange = courtWidth / 2 - ballRadius

      /* Collision with upper bounds - just bounce off the wall */
      if (ball.position.y < -verticalRange) {
        ballDirection.y *= -1
        ball.position.y = -verticalRange
      } else if (ball.position.y > verticalRange) {
        ballDirection.y *= -1
        ball.position.y = verticalRange
      }

      /* Horizontal collision with wall -- score! */
      if (ball.position.x < -horizontalRange) {
        ballDirection.x *= -1
        ball.position.x = -horizontalRange
        increaseEnemyScore()
        setIntensity(1)
      } else if (ball.position.x > horizontalRange) {
        ballDirection.x *= -1
        ball.position.x = horizontalRange
        increasePlayerScore()
        setIntensity(1)
      }
    }
  })

  return null
}
