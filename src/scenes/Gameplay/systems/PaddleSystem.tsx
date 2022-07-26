import { useFrame } from "@react-three/fiber"
import { useGameplayStore } from "../state"
import { controller } from "../../../input/controller"
import { courtHeight, paddleHeight, paddleSpeed } from "../configuration"

export const PaddleSystem = () => {
  const { player, enemy } = useGameplayStore()

  useFrame((_, dt) => {
    /* Move player */
    {
      if (player && controller) {
        const move = controller.controls.move.value
        player.position.y += move.y * dt * paddleSpeed
      }
    }

    /* Constrain movement to the court */
    {
      const verticalRange = courtHeight / 2 - paddleHeight / 2 - 0.5

      const paddles = [player, enemy]

      paddles.forEach((paddle) => {
        if (paddle.position.y < -verticalRange) {
          paddle.position.y = -verticalRange
        } else if (paddle.position.y > verticalRange) {
          paddle.position.y = verticalRange
        }
      })
    }
  })

  return null
}
