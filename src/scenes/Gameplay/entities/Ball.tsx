import { useEffect, useRef } from "react"
import { Group } from "three"
import { Animate, AnimationFunction } from "../../../lib/Animate"
import { ballRadius } from "../configuration"
import { store } from "../state"

const rotate: AnimationFunction = (dt, { rotation }) => {
  rotation.x += 0.3 * dt
  rotation.y += 0.7 * dt
}

export const Ball = () => {
  const ball = useRef<Group>(null!)

  useEffect(() => {
    store.set({ ball: ball.current })
  })

  return (
    <group ref={ball}>
      <Animate update={rotate}>
        <mesh>
          <dodecahedronGeometry args={[ballRadius]} />
          <meshStandardMaterial color="white" metalness={0.2} roughness={0.1} />
        </mesh>
      </Animate>
    </group>
  )
}
