import { ReactNode } from "react"
import { Box2, ColorRepresentation, Vector2 } from "three"
import { courtHeight, paddleHeight, paddleWidth } from "../configuration"
import { ECS } from "../state"

export type PaddleProps = {
  children?: ReactNode
  color: ColorRepresentation
  position: number
}

export const Paddle = ({ position, color, children }: PaddleProps) => (
  <ECS.Entity>
    <ECS.Component
      name="paddle"
      data={{
        bounds: new Box2(
          new Vector2(position, -(courtHeight / 2 - paddleHeight / 2)),
          new Vector2(position, +(courtHeight / 2 - paddleHeight / 2))
        )
      }}
    />
    <ECS.Component name="velocity">
      <vector2 />
    </ECS.Component>

    <ECS.Component name="transform">
      <group position-x={position}>
        <mesh>
          <boxGeometry args={[paddleWidth, paddleHeight, paddleWidth]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.1} />
        </mesh>
      </group>
    </ECS.Component>

    {children}
  </ECS.Entity>
)
