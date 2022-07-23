import Background from "./Background"
import Ball from "./Ball"
import Court from "./Court"
import Paddle from "./Paddle"

export default function Gameplay() {
  return (
    <group>
      <Background />
      <Court />
      <Paddle color="hsl(130, 100%, 60%)" position-x={-8} />
      <Paddle color="hsl(200, 100%, 60%)" position-x={+8} />
      <Ball />
    </group>
  )
}
