import { GroupProps, MeshProps } from "@react-three/fiber"
import { forwardRef } from "react"
import { Mesh } from "three"
import { courtHeight, courtWidth } from "./configuration"
import { setGameObject } from "./state"

const COLOR = "hotpink"

const HorizontalWall = forwardRef<Mesh, MeshProps>((props, ref) => (
  <mesh {...props} ref={ref}>
    <boxGeometry args={[courtWidth, 0.1, 0.3]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
))

const VerticalWall = forwardRef<Mesh, MeshProps>((props, ref) => (
  <mesh {...props} ref={ref}>
    <boxGeometry args={[0.1, courtHeight, 0.3]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
))

const MiddleLine = () => (
  <mesh>
    <planeGeometry args={[0.05, courtHeight]} />
    <meshStandardMaterial color={COLOR} opacity={0.2} transparent />
  </mesh>
)

const Background = () => {
  return (
    <mesh>
      <planeGeometry args={[courtWidth, courtHeight]} />
      <meshStandardMaterial color={COLOR} opacity={0.015} transparent />
    </mesh>
  )
}

const Court = (props: GroupProps) => {
  return (
    <group {...props}>
      <HorizontalWall
        position-y={-courtHeight / 2}
        ref={setGameObject("lowerWall")}
      />
      <HorizontalWall
        position-y={+courtHeight / 2}
        ref={setGameObject("upperWall")}
      />
      <VerticalWall
        position-x={-(courtWidth / 2 - 0.05)}
        ref={setGameObject("leftWall")}
      />
      <VerticalWall
        position-x={+(courtWidth / 2 - 0.05)}
        ref={setGameObject("rightWall")}
      />
      <MiddleLine />
      <Background />
    </group>
  )
}

export default Court
