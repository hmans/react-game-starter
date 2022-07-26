import { useFrame } from "@react-three/fiber"
import { useGameplayStore } from "../state"
import { controller } from "../../../input/controller"
import { paddleSpeed } from "../configuration"

export const PaddleSystem = () => {
  const { player, enemy } = useGameplayStore()

  useFrame((_, dt) => {
    /* Move player */
    if (player && controller) {
      const move = controller.controls.move.value
      player.position.y += move.y * dt * paddleSpeed
    }

    // /* Constrain movement to the court */
    // const verticalRange = courtHeight / 2 - paddleHeight / 2 - 0.5

    // if (transform.position.y < -verticalRange) {
    //   transform.position.y = -verticalRange
    // } else if (transform.position.y > verticalRange) {
    //   transform.position.y = verticalRange
    // }
  })

  return null
}
