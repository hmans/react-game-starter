import { MeshProps } from "@react-three/fiber"

const COLOR = "hotpink"

const HorizontalWall = (props: MeshProps) => (
  <mesh {...props}>
    <boxGeometry args={[18, 0.1, 0.1]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
)

const VerticalWall = (props: MeshProps) => (
  <mesh {...props}>
    <boxGeometry args={[0.1, 10, 0.1]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
)

const Court = () => {
  return (
    <group>
      <HorizontalWall position-y={-5} />
      <HorizontalWall position-y={+5} />
      <VerticalWall position-x={-8.95} />
      <VerticalWall position-x={+8.95} />
    </group>
  )
}

export default Court
