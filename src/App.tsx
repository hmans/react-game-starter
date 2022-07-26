import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Camera } from "./Camera"
import { PostProcessing } from "./lib/PostProcessing"
import { Gameplay } from "./scenes/Gameplay"

function App() {
  return (
    <Canvas flat dpr={1}>
      <color attach="background" args={["#444"]} />
      <Environment preset="sunset" />
      <Camera />
      <PostProcessing />
      {/* <PerformanceMonitor /> */}

      <Gameplay />
    </Canvas>
  )
}

export default App
