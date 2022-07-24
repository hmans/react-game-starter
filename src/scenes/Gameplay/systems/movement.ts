import { ECS } from "../state"

const withVelocity = ECS.world.archetype("velocity").entities

const movement = (dt: number) => {
  for (const entity of withVelocity) {
    console.log(entity)
  }
}

export default movement
