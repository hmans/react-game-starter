import Paddle from "./Paddle"

export default function Gameplay() {
  return (
    <group>
      <Paddle color="hsl(130, 100%, 60%)" position-x={-2.5} />
      <Paddle color="hsl(200, 100%, 60%)" position-x={+2.5} />
    </group>
  )
}
