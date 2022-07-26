import { useFrame } from "@react-three/fiber"
import { ballSystem } from "./ballSystem"
import { movementSystem } from "./movementSystem"
import { paddleSystem } from "./paddleSystem"
import { playerControlSystem } from "./playerControlSystem"

export const Systems = () => {
  useFrame((_, dt) => {
    playerControlSystem()
    movementSystem(dt)
    ballSystem()
    paddleSystem()
  })

  return null
}
