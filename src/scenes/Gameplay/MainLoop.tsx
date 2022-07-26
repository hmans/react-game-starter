import { useFrame } from "@react-three/fiber"
import { useGameplayStore } from "./state"

export const MainLoop = () => {
  const { ballDirection, ball, ballSpeed, player, enemy } = useGameplayStore()
  const store = useGameplayStore()
  console.log("MainLoop", store.ball)

  useFrame((_, dt) => {
    if (!ball) return

    /* Move ball */
    ball.position.x += ballDirection.x * ballSpeed * dt
    ball.position.y += ballDirection.y * ballSpeed * dt
  })

  return null
}
