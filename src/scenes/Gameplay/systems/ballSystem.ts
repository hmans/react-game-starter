import { Box2, Vector2 } from "three"
import { ballRadius, paddleHeight, paddleWidth } from "../configuration"
import { ECS, increaseEnemyScore, increasePlayerScore } from "../state"

const { entities: balls } = ECS.world.archetype("ball")
const { entities: paddles } = ECS.world.archetype("isPaddle")

const ballDimensions = new Box2(
  new Vector2(-ballRadius, -ballRadius),
  new Vector2(+ballRadius, +ballRadius)
)

const tmpBox2 = new Box2()

export function ballSystem() {
  for (const { transform, velocity, ball } of balls) {
    const { bounds } = ball

    const ballAABB = tmpBox2
      .copy(ballDimensions)
      .translate(new Vector2(transform.position.x, transform.position.y))

    /* Vertical collision */
    if (transform.position.y < bounds.min.y) {
      velocity.y = -velocity.y
      transform.position.y = bounds.min.y
    } else if (transform.position.y > bounds.max.y) {
      velocity.y = -velocity.y
      transform.position.y = bounds.max.y
    }

    /* Horizontal collision with wall -- score! */
    if (transform.position.x < bounds.min.x) {
      velocity.x = -velocity.x
      transform.position.x = bounds.min.x
      increaseEnemyScore()
    } else if (transform.position.x > bounds.max.x) {
      velocity.x = -velocity.x
      transform.position.x = bounds.max.x
      increasePlayerScore()
    }

    /* Check paddle collisions */
    for (const paddle of paddles) {
      const paddleBox = new Box2(
        new Vector2(
          paddle.transform.position.x - paddleWidth / 2,
          paddle.transform.position.y - paddleHeight / 2
        ),
        new Vector2(
          paddle.transform.position.x + paddleWidth / 2,
          paddle.transform.position.y + paddleHeight / 2
        )
      )

      if (ballAABB.intersectsBox(paddleBox)) {
        velocity.x < 0
          ? (transform.position.x = paddleBox.max.x + ballRadius)
          : (transform.position.x = paddleBox.min.x - ballRadius)

        velocity.x *= -1
      }
    }
  }
}
