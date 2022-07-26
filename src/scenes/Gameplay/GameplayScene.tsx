import { Animate, AnimationFunction } from "../../lib/Animate"
import { Effect } from "../../lib/Effect"
import { Keypress } from "../../lib/Keypress"
import { Delay } from "../../lib/timeline-composer"
import { returnToTitle } from "../../state"
import Court from "./Court"
import { Ball, Enemy, Player } from "./entities"
import { ScoreHUD } from "./ScoreHUD"
import {
  initializeGameplay,
  MatchState,
  resetRound,
  setGameObject,
  startPlaying,
  store
} from "./state"
import { Systems } from "./systems/Systems"

const tiltWithBall: AnimationFunction = (dt, object) => {
  /* We can't afford to do this reactively here, will tweak later... */
  const ball = store.state.ball

  object.rotation.x = (ball ? ball.position.y : 0) / -60
  object.rotation.y = (ball ? ball.position.x : 0) / 120
}

export const GameplayScene = () => (
  <group>
    <Keypress code="Escape" onPress={returnToTitle} />
    <Effect callback={initializeGameplay} />

    <Animate update={tiltWithBall}>
      <Court position-z={-0.5} />
      <ScoreHUD position={[0, 4, 1]} />
      <Player />
      <Enemy />

      <MatchState state="intro">
        <Delay seconds={0.75}>
          <Effect callback={startPlaying} />
        </Delay>
      </MatchState>

      <MatchState state={["intro", "playing"]}>
        <Ball />
      </MatchState>

      <MatchState state="goal">
        <Delay seconds={1}>
          <Effect callback={resetRound} />
        </Delay>
      </MatchState>
    </Animate>

    <Systems />
    <CameraTarget />
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
