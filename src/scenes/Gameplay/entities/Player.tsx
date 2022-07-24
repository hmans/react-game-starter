import Paddle from "../Paddle"
import { ECS } from "../state"

export const Player = () => (
  <ECS.Entity>
    <ECS.Component name="transform">
      <group position-x={-8}>
        <Paddle color="hsl(130, 100%, 60%)" />
      </group>
    </ECS.Component>
  </ECS.Entity>
)
