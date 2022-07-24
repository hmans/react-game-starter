import { lerp } from "three/src/math/MathUtils"
import { Animate, AnimationFunction } from "../../lib/Animate"
import Background from "./Background"
import Ball from "./Ball"
import Court from "./Court"
import { Entities } from "./Entities"
import Player from "./entities/Player"
import Paddle from "./Paddle"
import { ECS } from "./state"

const followMouse: AnimationFunction = (dt, { rotation }, { mouse }) => {
  rotation.x = lerp(rotation.x, mouse.y * 0.1, dt * 10)
  rotation.y = lerp(rotation.y, mouse.x * -0.1, dt * 10)
}

export default function Gameplay() {
  return (
    <group>
      <Animate update={followMouse}>
        <Entities />

        <Background />
        <Court position-z={-0.5} />

        {/* Player */}
        <ECS.Entity>
          <ECS.Component name="transform">
            <Paddle color="hsl(130, 100%, 60%)" position-x={-8} />
          </ECS.Component>
        </ECS.Entity>

        {/* Enemy */}
        <ECS.Entity>
          <ECS.Component name="transform">
            <Paddle color="hsl(200, 100%, 60%)" position-x={+8} />
          </ECS.Component>
        </ECS.Entity>

        {/* Ball */}
        <ECS.Entity>
          <ECS.Component name="isBall" data={true} />
          <ECS.Component name="transform">
            <Ball />
          </ECS.Component>
        </ECS.Entity>
      </Animate>
    </group>
  )
}
