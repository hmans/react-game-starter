import { useFrame } from "@react-three/fiber"
import { ballSystem } from "./ballSystem"
import { movementSystem } from "./movementSystem"
import { playerControlSystem } from "./playerControlSystem"

export const Systems = () => {
  useFrame((_, dt) => {
    playerControlSystem()
    movementSystem(dt)
    ballSystem()
  })

  return null
}
