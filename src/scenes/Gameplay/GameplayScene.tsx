import { useLayoutEffect } from "react"
import { Animate, AnimationFunction } from "../../lib/Animate"
import { Keypress } from "../../lib/Keypress"
import { returnToTitle } from "../../state"
import Court from "./Court"
import { Ball, Enemy, Player } from "./entities"
import { ScoreHUD } from "./ScoreHUD"
import { initializeGameplay, setGameObject, startRound, store } from "./state"
import { Systems } from "./systems/Systems"

export const GameplayScene = () => {
  const followBall: AnimationFunction = (dt, object) => {
    /* We can't afford to do this reactively here, will tweak later... */
    const ball = store.state.ball

    if (!ball) return
    object.rotation.x = ball.position.y / -60
    object.rotation.y = ball.position.x / 120
  }

  useLayoutEffect(() => {
    initializeGameplay()
    startRound()
  }, [])

  return (
    <group>
      <Keypress code="Escape" onPress={returnToTitle} />

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
