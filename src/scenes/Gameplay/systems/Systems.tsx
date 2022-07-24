import { useFrame } from "@react-three/fiber"
import { playerControlSystem } from "./playerControlSystem"
import { movementSystem } from "./movementSystem"
import { ballSystem } from "./ballSystem"

export const Systems = () => {
  useFrame((_, dt) => {
    playerControlSystem()
    movementSystem(dt)
    ballSystem()
  })

  return null
}
