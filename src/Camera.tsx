import { PerspectiveCamera } from "@react-three/drei"

export function Camera() {
  return <PerspectiveCamera position={[0, 0, 20]} makeDefault />
}
