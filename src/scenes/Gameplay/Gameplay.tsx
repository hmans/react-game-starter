import { controller } from "../../input/controller"
import { Animate, AnimationFunction } from "../../lib/Animate"
import { useController } from "../../lib/useController"
import Background from "./Background"
import Court from "./Court"
import { Ball, Enemy, Player } from "./entities"
import { ScoreHUD } from "./ScoreHUD"
import { setGameObject, store, useGameplayStore } from "./state"
import { Systems } from "./systems/Systems"

export default function Gameplay() {
  /* Initialize and update game input */
  useController(controller)

  const followBall: AnimationFunction = (dt, object) => {
    /* We can't afford to do this reactively here, will tweak later... */
    const ball = store.state.ball

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

        <CameraTarget />
      </Animate>

      <Systems />
    </group>
  )
}

const CameraTarget = ({ debug = false }) => (
  <group ref={setGameObject("cameraTarget")}>
    {debug && (
      <mesh>
        <planeGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>
    )}
  </group>
)
