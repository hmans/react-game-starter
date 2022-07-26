import { useFrame } from "@react-three/fiber"
import { useGameplayStore } from "./state"

export const MainLoop = () => {
  const { ball, ballDirection, ballSpeed } = useGameplayStore()

  useFrame((_, dt) => {
    if (!ball) return

    /* Move ball */
    ball.position.x += ballDirection.x * ballSpeed * dt
    ball.position.y += ballDirection.y * ballSpeed * dt
  })

  return null
}
