import { courtWidth, enemyColor, paddleWidth } from "../configuration"
import { GameObject } from "../state"
import { Paddle } from "./Paddle"

export const Enemy = () => (
  <GameObject name="enemy" position-x={+(courtWidth / 2 - paddleWidth - 0.5)}>
    <Paddle color={enemyColor} />
  </GameObject>
)
