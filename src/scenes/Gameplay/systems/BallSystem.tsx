import { useFrame } from "@react-three/fiber"
import { ballRadius, courtHeight, courtWidth } from "../configuration"
import {
  increaseEnemyScore,
  increasePlayerScore,
  setIntensity,
  useGameplayStore
} from "../state"

export const BallSystem = () => {
  const { ball, ballDirection, ballSpeed } = useGameplayStore()

  useFrame((_, dt) => {
    if (!ball) return

    {
      /* Move ball */
      ball.position.x += ballDirection.x * ballSpeed * dt
      ball.position.y += ballDirection.y * ballSpeed * dt
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
