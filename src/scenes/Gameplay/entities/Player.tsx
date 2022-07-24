import Paddle from "../Paddle"
import { ECS } from "../state"

const Player = () => {
  return (
    <ECS.Entity>
      <ECS.Component name="transform">
        <Paddle color="hsl(130, 100%, 60%)" position-x={-8} />
      </ECS.Component>
    </ECS.Entity>
  )
}

export default Player
