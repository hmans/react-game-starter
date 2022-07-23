export const Gameplay = () => {
  return (
    <mesh>
      <dodecahedronGeometry />
      <meshPhysicalMaterial color="hotpink" metalness={0.2} roughness={0.1} />
    </mesh>
  )
}
