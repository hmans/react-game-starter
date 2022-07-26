import { courtHeight, paddleHeight } from "../configuration"
import { ECS } from "../state"

const { entities } = ECS.world.archetype("paddle", "transform")

export function paddleSystem() {
  for (const { transform, paddle } of entities) {
    /* Constrain movement to the court */
    const verticalRange = courtHeight / 2 - paddleHeight / 2 - 0.5

    if (transform.position.y < -verticalRange) {
      transform.position.y = -verticalRange
    } else if (transform.position.y > verticalRange) {
      transform.position.y = verticalRange
    }
  }
}
