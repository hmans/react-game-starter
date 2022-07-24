import { useCallback } from "react"
import { lerp } from "three/src/math/MathUtils"
import { controller } from "../../input/controller"
import { Animate, AnimationFunction } from "../../lib/Animate"
import { useController } from "../../lib/useController"
import Background from "./Background"
import Court from "./Court"
import { Ball, Enemy, Player } from "./entities"
import { ScoreHUD } from "./ScoreHUD"
import { ECS } from "./state"
import { Systems } from "./systems/Systems"

export default function Gameplay() {
  /* Initialize and update game input */
  useController(controller)

  /* Fetch the first "isBall" entity from the ECS. */
  const ball = ECS.useArchetype("isBall").entities[0]

  const followBall: AnimationFunction = useCallback(
    (_, { rotation }) => {
      if (!ball) return
      rotation.x = ball.transform.position.y / -14
      rotation.y = ball.transform.position.x / 40
    },
    [ball]
  )

  return (
    <group>
      <Background />

      <Animate update={followBall}>
        <Court position-z={-0.5} />
        <ScoreHUD position={[0, 4, 1]} />

        <Player />
        <Enemy />
        <Ball />
      </Animate>

      <Systems />
    </group>
  )
}
