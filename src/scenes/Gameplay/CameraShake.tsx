import {
  CameraShake as DreiCameraShake,
  ShakeController
} from "@react-three/drei"
import { useEffect, useRef } from "react"
import { useStore } from "statery"
import { store } from "./state"

export function CameraShake() {
  const { intensity } = useStore(store)
  const shake = useRef<ShakeController>(null!)

  useEffect(() => {
    shake.current.setIntensity(intensity)
  }, [intensity])

  return (
    <DreiCameraShake
      ref={shake}
      yawFrequency={10}
      maxYaw={0.05}
      maxPitch={0.05}
      maxRoll={0.05}
      pitchFrequency={10}
      rollFrequency={10}
      intensity={0}
      decay
      decayRate={1.5}
    />
  )
}
