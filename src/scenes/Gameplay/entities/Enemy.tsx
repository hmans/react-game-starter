import { Rect } from "../../../lib/Rect"
import Paddle from "../Paddle"
import { ECS } from "../state"

export const Enemy = () => (
  <ECS.Entity>
    <ECS.Component name="isPaddle" data={true} />
    <ECS.Component name="area" data={Rect(8, -3.5, 8, 3.5)} />

    <ECS.Component name="transform">
      <group position-x={+8}>
        <Paddle color="hsl(200, 100%, 60%)" />
      </group>
    </ECS.Component>
  </ECS.Entity>
)
