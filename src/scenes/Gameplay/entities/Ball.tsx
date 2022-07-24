import { ECS } from "../state"

export const Ball = () => (
  <ECS.Entity>
    <ECS.Component name="isBall" data={true} />

    <ECS.Component name="transform">
      <group>
        <Ball />
      </group>
    </ECS.Component>

    <ECS.Component name="velocity">
      <vector2 x={5} y={2} />
    </ECS.Component>
  </ECS.Entity>
)
