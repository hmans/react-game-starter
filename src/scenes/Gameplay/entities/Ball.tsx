import { insideCircle } from "randomish"
import { Vector2 } from "three"
import { Animate, AnimationFunction } from "../../../lib/Animate"
import { AABB } from "../../../lib/miniplex-game"
import { ballRadius } from "../configuration"
import { ECS } from "../state"

const rotate: AnimationFunction = (dt, { rotation }) => {
  rotation.x += 0.3 * dt
  rotation.y += 0.7 * dt
}

export const Ball = () => {
  return (
    <ECS.Entity>
      <ECS.Component name="transform">
        <group>
          <Animate update={rotate}>
            <mesh>
              <dodecahedronGeometry args={[ballRadius]} />
              <meshStandardMaterial
                color="white"
                metalness={0.2}
                roughness={0.1}
              />
            </mesh>
          </Animate>
        </group>
      </ECS.Component>

      <ECS.Component
        name="velocity"
        data={new Vector2()
          .copy(insideCircle() as Vector2)
          .normalize()
          .multiplyScalar(15)}
      />

      <ECS.Component name="ball" data={{}} />

      <ECS.Component
        name="collision"
        data={{ aabb: AABB(-ballRadius, -ballRadius, ballRadius, ballRadius) }}
      />
    </ECS.Entity>
  )
}
