import { Box2, Vector2 } from "three"
import { ballRadius } from "../configuration"
import { ECS, increaseEnemyScore, increasePlayerScore } from "../state"

const { entities: balls } = ECS.world.archetype("ball")
const { entities: paddles } = ECS.world.archetype("paddle")

const ballDimensions = new Box2(
  new Vector2(-ballRadius, -ballRadius),
  new Vector2(+ballRadius, +ballRadius)
)

const tmpBox2 = new Box2()

export function ballSystem() {
  for (const { transform, velocity, area } of balls) {
    const ballAABB = tmpBox2
      .copy(ballDimensions)
      .translate(new Vector2(transform.position.x, transform.position.y))

    /* Vertical collision */
    if (ballAABB.min.y < area.min.y) {
      velocity.y = -velocity.y
      transform.position.y += area.min.y - ballAABB.min.y
    } else if (ballAABB.max.y > area.max.y) {
      velocity.y = -velocity.y
      transform.position.y -= ballAABB.max.y - area.max.y
    }

    /* Horizontal collision with wall -- score! */
    if (ballAABB.min.x < area.min.x) {
      velocity.x = -velocity.x
      transform.position.x += area.min.x - ballAABB.min.x
      increaseEnemyScore()
    } else if (ballAABB.max.x > area.max.x) {
      velocity.x = -velocity.x
      transform.position.x -= ballAABB.max.x - area.max.x
      increasePlayerScore()
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
