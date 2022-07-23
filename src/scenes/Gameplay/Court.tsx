import { MeshProps } from "@react-three/fiber"

const COLOR = "hotpink"

const HorizontalWall = (props: MeshProps) => (
  <mesh {...props}>
    <boxGeometry args={[18, 0.1, 0.3]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
)

const VerticalWall = (props: MeshProps) => (
  <mesh {...props}>
    <boxGeometry args={[0.1, 10, 0.3]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
)

const MiddleLine = () => (
  <mesh>
    <planeGeometry args={[0.05, 10]} />
    <meshStandardMaterial color={COLOR} opacity={0.2} transparent />
  </mesh>
)

const Background = () => {
  return (
    <mesh>
      <planeGeometry args={[18, 10]} />
      <meshStandardMaterial color={COLOR} opacity={0.015} transparent />
    </mesh>
  )
}

const Court = () => {
  return (
    <group>
      <HorizontalWall position-y={-5} />
      <HorizontalWall position-y={+5} />
      <VerticalWall position-x={-8.95} />
      <VerticalWall position-x={+8.95} />
      <MiddleLine />
      <Background />
    </group>
  )
}

export default Court
