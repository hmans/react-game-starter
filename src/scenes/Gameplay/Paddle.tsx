import { GroupProps } from "@react-three/fiber"

type PaddleProps = { color?: string } & GroupProps

const Paddle = ({ color, ...props }: PaddleProps) => (
  <group {...props}>
    <mesh>
      <boxGeometry args={[0.5, 2.25, 0.5]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.1} />
    </mesh>
  </group>
)

export default Paddle
