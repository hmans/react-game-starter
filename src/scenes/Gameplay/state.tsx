import { GroupProps } from "@react-three/fiber"
import { Ref } from "react"
import { makeStore } from "statery"
import { Object3D } from "three"

export const store = makeStore({
  playerScore: 0,
  enemyScore: 0,
  intensity: 0,

  player: null as Object3D | null,
  enemy: null as Object3D | null,
  ball: null as Object3D | null
})

export const setGameObject =
  <O extends Object3D>(name: keyof typeof store.state): Ref<O> =>
  (object) =>
    store.set({ [name]: object })

export const GameObject = ({
  name,
  ...props
}: { name: keyof typeof store.state } & GroupProps) => (
  <group ref={setGameObject(name)} {...props} />
)

export const increasePlayerScore = () =>
  store.set(({ playerScore }) => ({ playerScore: playerScore + 1 }))

export const increaseEnemyScore = () =>
  store.set(({ enemyScore }) => ({ enemyScore: enemyScore + 1 }))

export const setIntensity = (intensity: number) =>
  store.set({ intensity: Math.max(store.state.intensity, intensity) })
