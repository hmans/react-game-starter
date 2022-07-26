import { controller } from "../../input/controller"
import { Animate, AnimationFunction } from "../../lib/Animate"
import { useController } from "../../lib/useController"
import Background from "./Background"
import Court from "./Court"
import { Ball, Enemy, Player } from "./entities"
import { MainLoop } from "./MainLoop"
import { ScoreHUD } from "./ScoreHUD"

export default function Gameplay() {
  /* Initialize and update game input */
  useController(controller)

  const followBall: AnimationFunction = () => {}

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

      <MainLoop />
    </group>
  )
}
