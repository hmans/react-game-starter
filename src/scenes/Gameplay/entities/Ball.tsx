import { Box2, Vector2 } from "three"
import { Animate, AnimationFunction } from "../../../lib/Animate"
import { ballRadius, courtHeight, courtWidth } from "../configuration"
import { ECS } from "../state"

const rotate: AnimationFunction = (dt, { rotation }) => {
  rotation.x += 0.3 * dt
  rotation.y += 0.7 * dt
}

export const Ball = () => (
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

    <ECS.Component name="velocity">
      <vector2 x={8} y={4} />
    </ECS.Component>

    <ECS.Component
      name="ball"
      data={{
        bounds: new Box2(
          new Vector2(
            -(courtWidth / 2 - ballRadius),
            -(courtHeight / 2 - ballRadius)
          ),
          new Vector2(
            +(courtWidth / 2 - ballRadius),
            +(courtHeight / 2 - ballRadius)
          )
        )
      }}
    />
  </ECS.Entity>
)
