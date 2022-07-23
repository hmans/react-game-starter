import { GroupProps } from "@react-three/fiber"

type PaddleProps = { color?: string } & GroupProps

const Paddle = ({ color, ...props }: PaddleProps) => {
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.1} />
      </mesh>
    </group>
  )
}

export default Paddle
