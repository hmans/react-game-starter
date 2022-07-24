import { controller } from "../../../input/controller"
import { ECS } from "../state"
import { Paddle } from "./Paddle"

export const Player = () => (
  <Paddle position={-8} color="hsl(130, 100%, 60%)">
    <ECS.Component name="controller" data={controller} />
  </Paddle>
)
