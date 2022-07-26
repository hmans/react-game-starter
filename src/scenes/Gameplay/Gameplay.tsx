import { controller } from "../../input/controller"
import { Animate, AnimationFunction } from "../../lib/Animate"
import { useController } from "../../lib/useController"
import Background from "./Background"
import Court from "./Court"
import { Ball, Enemy, Player } from "./entities"
import { ScoreHUD } from "./ScoreHUD"
import { useGameplayStore } from "./state"
import { Systems } from "./systems/Systems"

export default function Gameplay() {
  /* Initialize and update game input */
  useController(controller)

  const { ball } = useGameplayStore()

  const followBall: AnimationFunction = (dt, object) => {
    if (!ball) return

    object.rotation.x = ball.position.y / -60
    object.rotation.y = ball.position.x / 120
  }

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
