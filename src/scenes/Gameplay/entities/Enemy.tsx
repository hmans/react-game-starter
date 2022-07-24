import Paddle from "../Paddle"
import { ECS } from "../state"

export const Enemy = () => (
  <ECS.Entity>
    <ECS.Component name="isPaddle" data={true} />

    <ECS.Component name="transform">
      <group position-x={+8}>
        <Paddle color="hsl(200, 100%, 60%)" />
      </group>
    </ECS.Component>
  </ECS.Entity>
)
