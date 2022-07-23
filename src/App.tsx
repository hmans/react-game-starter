import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

function App() {
  return (
    <Canvas dpr={1}>
      <Environment preset="sunset" />
      <OrbitControls autoRotate />

      <mesh>
        <dodecahedronGeometry />
        <meshPhysicalMaterial color="hotpink" metalness={0.2} roughness={0.1} />
      </mesh>
    </Canvas>
  )
}

export default App
