import { animated, useSpring } from "@react-spring/three"
import { GroupProps } from "@react-three/fiber"

export const SpringOnAppear = (props: GroupProps) => {
  const spring = useSpring({
    from: { scale: 0 },
    to: { scale: 1 }
  })

  return <animated.group {...props} {...spring} />
}
