import { useFrame } from "@react-three/fiber"
import { makeMovementSystem } from "../../../lib/miniplex-game"
import { ECS } from "../state"
import { ballSystem } from "./ballSystem"
import { playerControlSystem } from "./playerControlSystem"

export const Systems = () => {
  const movementSystem = makeMovementSystem(ECS.world)

  useFrame((_, dt) => {
    playerControlSystem()
    movementSystem(dt)
    ballSystem()
  })

  return null
}
