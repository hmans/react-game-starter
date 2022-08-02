import { useFrame } from "@react-three/fiber"
import { upTo } from "randomish"
import { useRef, useState } from "react"
import { Time, OneMinus } from "shader-composer"
import {
  Color,
  Mesh,
  MeshStandardMaterial,
  NormalBlending,
  Vector2,
  Vector3
} from "three"
import {
  Emitter,
  makeParticles,
  Particles,
  VFX,
  VFXMaterial
} from "vfx-composer/fiber"
import { ParticleAttribute } from "vfx-composer/units"
import { Lifetime } from "vfx-composer/modules"
import { Animate, AnimationFunction } from "../../../lib/Animate"
import { ballRadius } from "../configuration"
import { useGameplayStore } from "../state"

const tmpVec3 = new Vector3()

const rotate =
  (speed: Vector3): AnimationFunction =>
  (dt, { rotation }) => {
    rotation.x += speed.x * dt
    rotation.y += speed.y * dt
    rotation.z += speed.z * dt
  }

const variables = {
  time: Time(),
  lifetime: ParticleAttribute(new Vector2()),
  velocity: ParticleAttribute(new Vector3())
}

const {
  ParticleProgress,
  ParticleAge,
  module: lifetimeModule
} = Lifetime(variables.lifetime, variables.time)

export const BallTrail = makeParticles()

export const BallTrailEffect = () => {
  return (
    <BallTrail.Root>
      <planeGeometry args={[0.05, 0.05]} />

      <VFXMaterial
        baseMaterial={MeshStandardMaterial}
        color={new Color(2, 1, 2)}
        blending={NormalBlending}
        transparent
      >
        <VFX.Billboard />
        <VFX.Velocity velocity={variables.velocity} time={ParticleAge} />
        {/* <VFX.Acceleration force={new Vector3(0, -10, 0)} time={ParticleAge} /> */}
        <VFX.SetAlpha alpha={OneMinus(ParticleProgress)} />
        <VFX.Module module={lifetimeModule} />
      </VFXMaterial>
    </BallTrail.Root>
  )
}

const direction = new Vector3()

export const BallTrailEmitter = () => (
  <BallTrail.Emitter
    continuous
    count={10}
    setup={({ position }) => {
      direction.randomDirection()
      position.add(tmpVec3.copy(direction).multiplyScalar(upTo(0.3)))

      const t = variables.time.uniform.value
      variables.lifetime.value.set(t, t + 1)
      variables.velocity.value.copy(direction).multiplyScalar(upTo(5))
    }}
  />
)

export const Ball = () => (
  <Animate update={rotate(useGameplayStore().ballRotation)}>
    <BallTrailEmitter />

    <mesh>
      <dodecahedronGeometry args={[ballRadius]} />
      <meshStandardMaterial color="white" metalness={0.2} roughness={0.1} />
    </mesh>
  </Animate>
)
