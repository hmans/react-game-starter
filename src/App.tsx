import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { PostProcessing } from "./lib/PostProcessing"
import { Gameplay } from "./scenes/Gameplay"

function App() {
  return (
    <Canvas flat dpr={1}>
      <color attach="background" args={["#444"]} />
      <Environment preset="sunset" />
      <PerspectiveCamera position={[0, 0, 20]} makeDefault />
      <PostProcessing />
      <Perf position="bottom-right" deepAnalyze matrixUpdate />

      <Gameplay />
    </Canvas>
  )
}

export default App
