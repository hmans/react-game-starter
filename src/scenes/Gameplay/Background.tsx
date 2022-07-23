import {
  $,
  Add,
  Float,
  Mul,
  pipe,
  ShaderMaterialMaster,
  Time,
  Vec3,
  VertexPosition
} from "shader-composer"
import { useShader } from "shader-composer-r3f"
import { Simplex3DNoise } from "shader-composer-toybox"
import { Color } from "three"

const Background = () => {
  const shader = useShader(() => {
    return ShaderMaterialMaster({
      color: pipe(
        VertexPosition,
        (v) => Mul(v, 0.5),
        (v) => Vec3($`round(${v})`),
        (v) => Add(v, Time()),
        (v) => Simplex3DNoise(v),
        (v) => Mul(v, 0.1),
        (v) => Add(v, 0.1),
        (v) => Mul(new Color("hotpink"), v)
      )
    })
  })

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[40, 30]} />
      <shaderMaterial {...shader} key={Math.random()} />
    </mesh>
  )
}

export default Background
