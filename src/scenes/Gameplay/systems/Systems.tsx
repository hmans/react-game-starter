import { useFrame } from "@react-three/fiber"
import { playerControlSystem } from "./playerControlSystem"
import { ballSystem } from "./ballSystem"
import { makeCollisionSystem } from "../../../lib/miniplex-game/collisions"
import { ECS } from "../state"
import { makeMovementSystem } from "../../../lib/miniplex-game/velocity"

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
