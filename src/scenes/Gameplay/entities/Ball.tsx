import { Box2, Vector2 } from "three"
import { Animate, AnimationFunction } from "../../../lib/Animate"
import { ECS } from "../state"

const rotate: AnimationFunction = (dt, { rotation }) => {
  rotation.x += 0.3 * dt
  rotation.y += 0.7 * dt
}

const area = new Box2(new Vector2(-8.5, -4.5), new Vector2(8.5, 4.5))

export const Ball = () => (
  <ECS.Entity>
    <ECS.Component name="isBall" data={true} />

    <ECS.Component name="transform">
      <group>
        <Animate update={rotate}>
          <mesh>
            <dodecahedronGeometry args={[0.35]} />
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

    <ECS.Component name="area" data={area} />
  </ECS.Entity>
)
