import { useFrame } from "@react-three/fiber"
import { Quaternion } from "three"

export const CameraSystem = () => {
  useFrame(({ camera }, dt) => {
    camera.quaternion.slerp(new Quaternion().identity(), 0.05)
  })

  return null
}
