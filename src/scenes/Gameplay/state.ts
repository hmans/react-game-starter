import { makeStore } from "statery"
import { Object3D } from "three"

export const store = makeStore({
  playerScore: 0,
  enemyScore: 0,
  intensity: 0,

  player: Object3D,
  enemy: Object3D,
  ball: Object3D
})

export const increasePlayerScore = () =>
  store.set(({ playerScore }) => ({ playerScore: playerScore + 1 }))

export const increaseEnemyScore = () =>
  store.set(({ enemyScore }) => ({ enemyScore: enemyScore + 1 }))

export const setIntensity = (intensity: number) =>
  store.set({ intensity: Math.max(store.state.intensity, intensity) })
