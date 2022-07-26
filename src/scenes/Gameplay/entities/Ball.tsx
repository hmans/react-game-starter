import { Animate, AnimationFunction } from "../../../lib/Animate"
import { ballRadius } from "../configuration"
import { GameObject } from "../state"

const rotate: AnimationFunction = (dt, { rotation }) => {
  rotation.x += 0.3 * dt
  rotation.y += 0.7 * dt
}

export const Ball = () => (
  <GameObject name="ball">
    <Animate update={rotate}>
      <mesh>
        <dodecahedronGeometry args={[ballRadius]} />
        <meshStandardMaterial color="white" metalness={0.2} roughness={0.1} />
      </mesh>
    </Animate>
  </GameObject>
)
