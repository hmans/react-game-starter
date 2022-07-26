import { courtWidth, paddleWidth, playerColor } from "../configuration"
import { GameObject } from "../state"
import { Paddle } from "./Paddle"

export const Player = () => (
  <GameObject name="player" position-x={-(courtWidth / 2 - paddleWidth - 0.5)}>
    <Paddle color={playerColor} />
  </GameObject>
)
