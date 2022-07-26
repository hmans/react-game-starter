import { Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Camera } from "./lib/camera-composer"
import { ComponentRenderLogger } from "./lib/ComponentRenderLogger"
import { PostProcessing } from "./lib/PostProcessing"
import { Gameplay } from "./scenes/Gameplay"

function App() {
  return (
    <ComponentRenderLogger>
      <Canvas flat dpr={1}>
        <color attach="background" args={["#444"]} />
        <Environment preset="sunset" />
        <Camera />
        <PostProcessing />
        {/* <PerformanceMonitor /> */}

        <Gameplay />
      </Canvas>
    </ComponentRenderLogger>
  )
}

export default App
