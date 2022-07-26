import { Ref } from "react"
import { makeStore, useStore } from "statery"
import { Object3D, Vector2 } from "three"

export const store = makeStore({
  playerScore: 0,
  enemyScore: 0,
  intensity: 0,

  player: null as Object3D | null,
  enemy: null as Object3D | null,

  ball: null as Object3D | null,
  ballDirection: new Vector2(1, 1).normalize(),
  ballSpeed: 12
})

export const useGameplayStore = () => useStore(store)

export const setGameObject =
  <O extends Object3D>(name: keyof typeof store.state): Ref<O> =>
  (object) => {
    console.log("Setting game object", name, object)
    store.set({ [name]: object })
  }

export const increasePlayerScore = () =>
  store.set(({ playerScore }) => ({ playerScore: playerScore + 1 }))

export const increaseEnemyScore = () =>
  store.set(({ enemyScore }) => ({ enemyScore: enemyScore + 1 }))

export const setIntensity = (intensity: number) =>
  store.set({ intensity: Math.max(store.state.intensity, intensity) })
