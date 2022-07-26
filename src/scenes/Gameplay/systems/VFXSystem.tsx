import { useFrame } from "@react-three/fiber"
import { Color, Mesh, MeshStandardMaterial } from "three"
import { store } from "../state"

const normalColor = new Color("hotpink")

const lerpWallColor = (mesh: Mesh<any, MeshStandardMaterial>) => {
  mesh.material.color.lerp(normalColor, 0.03)
}

export const VFXSystem = () => {
  useFrame((_, dt) => {
    lerpWallColor(store.state.lowerWall)
    lerpWallColor(store.state.upperWall)
    lerpWallColor(store.state.leftWall)
    lerpWallColor(store.state.rightWall)
  })

  return null
}
