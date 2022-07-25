import { useFrame } from "@react-three/fiber"
import { playerControlSystem } from "./playerControlSystem"
import { movementSystem } from "./movementSystem"
import { ballSystem } from "./ballSystem"
import { collisionSystem } from "../../../lib/collisions"
import { ECS } from "../state"

export const Systems = () => {
  const collisions = collisionSystem(ECS.world)

  useFrame((_, dt) => {
    playerControlSystem()
    movementSystem(dt)
    collisions()
    ballSystem()
  })

  return null
}
