import { ReactNode } from "react"
import { ColorRepresentation } from "three"
import { Rect } from "../../../lib/Rect"
import { ECS } from "../state"

export type PaddleProps = {
  children?: ReactNode
  color: ColorRepresentation
  position: number
}

export const Paddle = ({ position, color, children }: PaddleProps) => (
  <ECS.Entity>
    <ECS.Component name="isPaddle" data={true} />
    <ECS.Component name="bounds" data={Rect(position, -3.5, position, 3.5)} />
    <ECS.Component name="velocity">
      <vector2 />
    </ECS.Component>

    <ECS.Component name="transform">
      <group position-x={position}>
        <mesh>
          <boxGeometry args={[0.5, 2.25, 0.5]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.1} />
        </mesh>
      </group>
    </ECS.Component>

    {children}
  </ECS.Entity>
)
