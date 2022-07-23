import { RootState, useFrame } from "@react-three/fiber"
import { FC, ReactNode, useRef } from "react"
import { Group, Object3D } from "three"

export type AnimationFunction = <T extends Object3D>(
  dt: number,
  object: T,
  r3fstate: RootState
) => void

export const Animate: FC<{
  children?: ReactNode
  update?: AnimationFunction
}> = ({ children, update }) => {
  const ref = useRef<Group>(null!)

  useFrame((state, dt) => {
    update(dt, ref.current!, state)
  })

  return <group ref={ref}>{children}</group>
}
