import { lerp } from "three/src/math/MathUtils"
import { Animate, AnimationFunction } from "../../lib/Animate"
import Background from "./Background"
import Ball from "./Ball"
import Court from "./Court"
import Paddle from "./Paddle"

const followMouse: AnimationFunction = (dt, { rotation }, { mouse }) => {
  rotation.x = lerp(rotation.x, mouse.y * 0.1, dt * 10)
  rotation.y = lerp(rotation.y, mouse.x * -0.1, dt * 10)
}

export default function Gameplay() {
  return (
    <group>
      <Animate update={followMouse}>
        <Background />
        <Court />
        <group position-z={0.5}>
          <Paddle color="hsl(130, 100%, 60%)" position-x={-8} />
          <Paddle color="hsl(200, 100%, 60%)" position-x={+8} />
          <Ball />
        </group>
      </Animate>
    </group>
  )
}
