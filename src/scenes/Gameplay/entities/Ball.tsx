import { insideCircle } from "randomish"
import { Box2, Vector2 } from "three"
import { Animate, AnimationFunction } from "../../../lib/Animate"
import { ballRadius, courtHeight, courtWidth } from "../configuration"
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
          .multiplyScalar(12)}
      />

      <ECS.Component name="ball" data={{}} />

      <ECS.Component
        name="dimensions"
        data={
          new Box2(
            new Vector2(-ballRadius, -ballRadius),
            new Vector2(ballRadius, ballRadius)
          )
        }
      />

      <ECS.Component
        name="area"
        data={
          new Box2(
            new Vector2(-(courtWidth / 2), -(courtHeight / 2)),
            new Vector2(+(courtWidth / 2), +(courtHeight / 2))
          )
        }
      />
    </ECS.Entity>
  )
}
