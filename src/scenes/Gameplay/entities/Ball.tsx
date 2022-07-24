import { Animate, AnimationFunction } from "../../../lib/Animate"
import { ECS } from "../state"

const rotate: AnimationFunction = (dt, { rotation }) => {
  rotation.x += 0.3 * dt
  rotation.y += 0.7 * dt
}

export const Ball = () => (
  <ECS.Entity>
    <ECS.Component name="isBall" data={true} />

    <ECS.Component name="transform">
      <group>
        <Animate update={rotate}>
          <mesh>
            <dodecahedronGeometry args={[0.4]} />
            <meshStandardMaterial
              color="white"
              metalness={0.2}
              roughness={0.1}
            />
          </mesh>
        </Animate>
      </group>
    </ECS.Component>

    <ECS.Component name="velocity">
      <vector2 x={5} y={2} />
    </ECS.Component>
  </ECS.Entity>
)
