import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { controller } from "../../input/controller"
import { enterGameplay } from "../../state/macroState"

export const TitleScene = () => {
  useFrame(() => {
    /* TODO: ControlFreak really needs actions/interactions! */
    if (controller.controls.fire.value > 0) {
      enterGameplay()
    }
  })

  return (
    <Text position={[0, 0, 10]} fontSize={1} textAlign="center">
      {"PRESS SPACE\nTO PONG"}
    </Text>
  )
}
