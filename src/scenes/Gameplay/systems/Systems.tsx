import { useFrame } from "@react-three/fiber"
import { paddleSteering } from "./paddleSteering"
import { movement } from "./movement"
import { ball } from "./ball"

export const Systems = () => {
  useFrame((_, dt) => {
    paddleSteering()
    movement(dt)
    ball()
  })

  return null
}
