import { GroupProps, MeshProps } from "@react-three/fiber"
import { ColorDepthEffect } from "postprocessing"
import { forwardRef } from "react"
import {
  ShaderMaterialMaster,
  pipe,
  VertexPosition,
  Mul,
  Round,
  Add,
  Time,
  Fract,
  SplitVector3,
  Smoothstep,
  Sub,
  vec3,
  Sin,
  Cos
} from "shader-composer"
import { useShader } from "shader-composer-r3f"
import { Simplex3DNoise } from "shader-composer-toybox"
import { Color, Mesh } from "three"
import { courtHeight, courtWidth } from "./configuration"
import { setGameObject } from "./state"

const COLOR = "hotpink"

const HorizontalWall = forwardRef<Mesh, MeshProps>((props, ref) => (
  <mesh {...props} ref={ref}>
    <boxGeometry args={[courtWidth, 0.1, 0.3]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
))

const VerticalWall = forwardRef<Mesh, MeshProps>((props, ref) => (
  <mesh {...props} ref={ref}>
    <boxGeometry args={[0.1, courtHeight, 0.3]} />
    <meshStandardMaterial color={COLOR} />
  </mesh>
))

const MiddleLine = () => (
  <mesh position-z={0.001}>
    <planeGeometry args={[0.3, courtHeight]} />
    <meshStandardMaterial color={COLOR} opacity={0.2} transparent />
  </mesh>
)

const Background = () => {
  const shader = useShader(() => {
    const time = Time()
    const position = Add(VertexPosition, vec3(Mul(time, 2), time, 0))
    const [x, y, z] = SplitVector3(position)
    const fx = Fract(x)
    const fy = Fract(y)

    const sx = Smoothstep(0, 0.05, fx)
    const sy = Smoothstep(0, 0.05, fy)

    const a = Mul(sx, sy)

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
