import { useFrame } from "@react-three/fiber"
import { movement } from "./movement"

export const Systems = () => {
  useFrame((_, dt) => {
    movement(dt)
  })

  return null
}
