import { useFrame } from "@react-three/fiber"
import { FC, ReactNode, useRef } from "react"
import { Group } from "three"

export type AnimationFunction = (dt: number, group: Group) => void

export const Animate: FC<{
  children?: ReactNode
  update?: AnimationFunction
}> = ({ children, update }) => {
  const ref = useRef<Group>(null!)

  useFrame((_, dt) => {
    update(dt, ref.current!)
  })

  return <group ref={ref}>{children}</group>
}
