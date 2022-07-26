import { Animate, AnimationFunction } from "../../lib/Animate"
import { Effect } from "../../lib/Effect"
import { Keypress } from "../../lib/Keypress"
import { Delay } from "../../lib/timeline-composer"
import { returnToTitle } from "../../state"
import Court from "./Court"
import { Ball, Enemy, Player } from "./entities"
import { ScoreHUD } from "./ScoreHUD"
import { initializeGameplay, setGameObject, startRound, store } from "./state"
import { Systems } from "./systems/Systems"

const followBall: AnimationFunction = (dt, object) => {
  /* We can't afford to do this reactively here, will tweak later... */
  const ball = store.state.ball

  if (!ball) return
  object.rotation.x = ball.position.y / -60
  object.rotation.y = ball.position.x / 120
}

export const GameplayScene = () => (
  <group>
    <Keypress code="Escape" onPress={returnToTitle} />

    <Effect callback={initializeGameplay} />

    <Delay seconds={0.75}>
      <Effect callback={startRound} />
    </Delay>

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
