import { Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { sRGBEncoding } from "three"
import Gameplay from "./scenes/Gameplay"

function App() {
  return (
    <Canvas flat dpr={1} gl={{ outputEncoding: sRGBEncoding }}>
      <color attach="background" args={["#444"]} />
      <Environment preset="sunset" />

      <Gameplay />
    </Canvas>
  )
}

export default App
