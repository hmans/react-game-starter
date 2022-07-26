import { GroupProps, MeshProps } from "@react-three/fiber"
import { forwardRef } from "react"
import {
  Add,
  Fract,
  Mul,
  ShaderMaterialMaster,
  Smoothstep,
  SplitVector2,
  SplitVector3,
  Sub,
  Time,
  Value,
  vec2,
  vec3,
  VertexPosition
} from "shader-composer"
import { useShader } from "shader-composer-r3f"
import { Color, Mesh } from "three"
import { courtHeight, courtWidth, wallColor } from "./configuration"
import { setGameObject } from "./state"

const HorizontalWall = forwardRef<Mesh, MeshProps>((props, ref) => (
  <mesh {...props} ref={ref}>
    <boxGeometry args={[courtWidth, 0.1, 0.3]} />
    <meshStandardMaterial color={wallColor} />
  </mesh>
))

const VerticalWall = forwardRef<Mesh, MeshProps>((props, ref) => (
  <mesh {...props} ref={ref}>
    <boxGeometry args={[0.1, courtHeight, 0.3]} />
    <meshStandardMaterial color={wallColor} />
  </mesh>
))

const MiddleLine = () => (
  <mesh position-z={0.001}>
    <planeGeometry args={[0.3, courtHeight]} />
    <meshStandardMaterial color={wallColor} opacity={0.2} transparent />
  </mesh>
)

const Grid2D = (
  v: Value<"vec2">,
  scale: Value<"float"> = 1,
  thickness: Value<"float"> = 0.1
) => {
  const [x, y] = SplitVector2(Mul(v, scale))

  const fx = Fract(x)
  const fy = Fract(y)

  const sx = Smoothstep(0, thickness, fx)
  const sy = Smoothstep(0, thickness, fy)

  return Mul(sx, sy)
}

const Background = () => {
  const shader = useShader(() => {
    const time = Time()
    const position = Add(VertexPosition, vec3(Mul(time, 2), time, 0))

    const [x, y, z] = SplitVector3(position)
    const a = Grid2D(vec2(x, y), 1, 0.02)

    return ShaderMaterialMaster({
      color: new Color("hotpink"),
      alpha: Sub(0.52, Mul(a, 0.5))
    })
  }, [])

  return (
    <mesh>
      <planeGeometry args={[courtWidth, courtHeight]} />
      <shaderMaterial {...shader} transparent key={Math.random()} />
      {/* <meshStandardMaterial color={COLOR} opacity={0.015} transparent /> */}
    </mesh>
  )
}

const Court = (props: GroupProps) => {
  return (
    <group {...props}>
      <HorizontalWall
        position-y={-courtHeight / 2}
        ref={setGameObject("lowerWall")}
      />
      <HorizontalWall
        position-y={+courtHeight / 2}
        ref={setGameObject("upperWall")}
      />
      <VerticalWall
        position-x={-(courtWidth / 2 - 0.05)}
        ref={setGameObject("leftWall")}
      />
      <VerticalWall
        position-x={+(courtWidth / 2 - 0.05)}
        ref={setGameObject("rightWall")}
      />
      <MiddleLine />
      <Background />
    </group>
  )
}

export default Court
