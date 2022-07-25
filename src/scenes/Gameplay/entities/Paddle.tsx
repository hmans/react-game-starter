import { ReactNode } from "react"
import { ColorRepresentation } from "three"
import { paddleHeight, paddleWidth } from "../configuration"
import { ECS } from "../state"
import { AABB } from "../../../lib/miniplex-game"

export type PaddleProps = {
  children?: ReactNode
  color: ColorRepresentation
  position: number
}

export const Paddle = ({ position, color, children }: PaddleProps) => (
  <ECS.Entity>
    <ECS.Component name="paddle" data={{}} />
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

    <ECS.Component
      name="collision"
      data={{
        aabb: AABB(
          -paddleWidth / 2,
          -paddleHeight / 2,
          paddleWidth / 2,
          paddleHeight / 2
        )
      }}
    />

    {children}
  </ECS.Entity>
)
