import { controller } from "../../../input/controller"
import { playerColor } from "../configuration"
import { Paddle } from "./Paddle"

export const Player = () => (
  <Paddle position={-8} color={playerColor}>
    <ECS.Component name="controller" data={controller} />
  </Paddle>
)
