import { lerp } from "three/src/math/MathUtils"
import { Animate, AnimationFunction } from "../../lib/Animate"
import Background from "./Background"
import Court from "./Court"
import { Ball, Enemy, Player } from "./entities"
import { Systems } from "./systems/Systems"

const followMouse: AnimationFunction = (dt, { rotation }, { mouse }) => {
  rotation.x = lerp(rotation.x, mouse.y * 0.1, dt * 10)
  rotation.y = lerp(rotation.y, mouse.x * -0.1, dt * 10)
}

export default function Gameplay() {
  return (
    <group>
      <Animate update={followMouse}>
        <Background />
        <Court position-z={-0.5} />

        <Player />
        <Enemy />
        <Ball />
      </Animate>

      <Systems />
    </group>
  )
}
