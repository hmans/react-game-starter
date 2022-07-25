import { useFrame } from "@react-three/fiber"
import {
  makeCollisionSystem,
  makeMovementSystem
} from "../../../lib/miniplex-game"
import { ECS } from "../state"
import { ballSystem } from "./ballSystem"
import { playerControlSystem } from "./playerControlSystem"

export const Systems = () => {
  const collisionSystem = makeCollisionSystem(ECS.world)
  const movementSystem = makeMovementSystem(ECS.world)

  useFrame((_, dt) => {
    playerControlSystem()
    movementSystem(dt)
    collisionSystem()
    ballSystem()
  })

  return null
}
