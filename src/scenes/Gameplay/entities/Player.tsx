import { controller } from "../../../input/controller"
import Paddle from "../Paddle"
import { ECS } from "../state"

export const Player = () => (
  <ECS.Entity>
    <ECS.Component name="isPaddle" data={true} />

    <ECS.Component name="controller" data={controller} />

    <ECS.Component name="transform">
      <group position-x={-8}>
        <Paddle color="hsl(130, 100%, 60%)" />
      </group>
    </ECS.Component>

    <ECS.Component name="velocity">
      <vector2 />
    </ECS.Component>
  </ECS.Entity>
)
