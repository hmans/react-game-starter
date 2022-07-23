import { useThree } from "@react-three/fiber"
import { Animate, AnimationFunction } from "../../lib/Animate"
import Background from "./Background"
import Ball from "./Ball"
import Court from "./Court"
import Paddle from "./Paddle"

const followMouse: AnimationFunction = (dt, group, { mouse }) => {
  group.rotation.x = mouse.y * 0.1
  group.rotation.y = mouse.x * -0.1
}

export default function Gameplay() {
  return (
    <group>
      <Animate update={followMouse}>
        <Background />
        <Court />
        <Paddle color="hsl(130, 100%, 60%)" position-x={-8} />
        <Paddle color="hsl(200, 100%, 60%)" position-x={+8} />
        <Ball />
      </Animate>
    </group>
  )
}
