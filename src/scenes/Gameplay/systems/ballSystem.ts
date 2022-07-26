import { Box2 } from "three"
import { ballRadius, courtHeight, courtWidth } from "../configuration"
import { ECS } from "../state"

const { entities: balls } = ECS.world.archetype("ball")
const { entities: paddles } = ECS.world.archetype("paddle")

const tmpBox2 = new Box2()

export function ballSystem() {
  for (const { transform, velocity } of balls) {
    const verticalRange = courtHeight / 2 - ballRadius
    const horizontalRange = courtWidth / 2 - ballRadius

    /* Collision with upper bounds - just bounce off the wall */
    if (transform.position.y < -verticalRange) {
      velocity.y *= -1
      transform.position.y = -verticalRange
    } else if (transform.position.y > verticalRange) {
      velocity.y *= -1
      transform.position.y = verticalRange
    }

    /* Horizontal collision with wall -- score! */
    if (transform.position.x < -horizontalRange) {
      velocity.x *= -1
      transform.position.x = -horizontalRange
    } else if (transform.position.x > horizontalRange) {
      velocity.x *= -1
      transform.position.x = horizontalRange
    }

    /* Check paddle collisions */
    // for (const paddle of paddles) {
    //   const paddleBox = new Box2(
    //     new Vector2(
    //       paddle.transform.position.x - paddleWidth / 2,
    //       paddle.transform.position.y - paddleHeight / 2
    //     ),
    //     new Vector2(
    //       paddle.transform.position.x + paddleWidth / 2,
    //       paddle.transform.position.y + paddleHeight / 2
    //     )
    //   )

    //   if (ballAABB.intersectsBox(paddleBox)) {
    //     velocity.x < 0
    //       ? (transform.position.x = paddleBox.max.x + ballRadius)
    //       : (transform.position.x = paddleBox.min.x - ballRadius)

    //     velocity.x *= -1
    //   }
    // }
  }
}
