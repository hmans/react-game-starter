import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Gameplay } from "./scenes/Gameplay"

function App() {
  return (
    <Canvas dpr={1}>
      <Environment preset="sunset" />
      <OrbitControls autoRotate />

      <Gameplay />
    </Canvas>
  )
}

export default App
