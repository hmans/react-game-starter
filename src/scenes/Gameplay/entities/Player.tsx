import Paddle from "../Paddle"
import { ECS } from "../state"

const Player = () => {
  return (
    <ECS.Entity>
      <ECS.Component
        name="render"
        data={<Paddle color="hsl(130, 100%, 60%)" position-x={-8} />}
      />
    </ECS.Entity>
  )
}

export default Player
