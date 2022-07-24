import { useFrame } from "@react-three/fiber"
import { paddleSteering } from "./paddleSteering"
import { movement } from "./movement"

export const Systems = () => {
  useFrame((_, dt) => {
    paddleSteering()
    movement(dt)
  })

  return null
}
