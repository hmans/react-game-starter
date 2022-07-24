import { GroupProps, MeshProps } from "@react-three/fiber"
import { courtHeight, courtWidth } from "./configuration"

const COLOR = "hotpink"

const HorizontalWall = (props: MeshProps) => (
  <mesh {...props}>
    <boxGeometry args={[courtWidth, 0.1, 0.3]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
)

const VerticalWall = (props: MeshProps) => (
  <mesh {...props}>
    <boxGeometry args={[0.1, courtHeight, 0.3]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
)

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
      <HorizontalWall position-y={-courtHeight / 2} />
      <HorizontalWall position-y={+courtHeight / 2} />
      <VerticalWall position-x={-(courtWidth / 2 - 0.05)} />
      <VerticalWall position-x={+(courtWidth / 2 - 0.05)} />
      <MiddleLine />
      <Background />
    </group>
  )
}

export default Court
