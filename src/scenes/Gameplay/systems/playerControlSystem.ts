import { ECS } from "../state"

const { entities } = ECS.world.archetype("paddle", "velocity", "controller")

export function playerControlSystem() {
  for (const { velocity, controller, paddle } of entities) {
    const move = controller.controls.move.value
    velocity.y = move.y * paddle.speed
  }
}
