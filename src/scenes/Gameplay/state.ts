import { between, chance } from "randomish"
import { Ref } from "react"
import { makeStore, useStore } from "statery"
import { Object3D, Vector2, Vector3 } from "three"

export const store = makeStore({
  playerScore: 0,
  enemyScore: 0,

  player: null as Object3D | null,
  enemy: null as Object3D | null,

  cameraTarget: null as Object3D | null,

  state: "start" as "start" | "playing" | "end",

  ballActive: false,
  ball: null as Object3D | null,
  ballDirection: new Vector2(),
  ballSpeed: 12,
  ballRotation: new Vector3().randomDirection()
})

export const useGameplayStore = () => useStore(store)

export const setGameObject =
  <O extends Object3D>(name: keyof typeof store.state): Ref<O> =>
  (object) =>
    queueMicrotask(() => {
      store.set({ [name]: object })
    })

export const increasePlayerScore = () =>
  store.set(({ playerScore }) => ({ playerScore: playerScore + 1 }))

export const increaseEnemyScore = () =>
  store.set(({ enemyScore }) => ({ enemyScore: enemyScore + 1 }))

export const randomizeBallRotation = () =>
  store.set((state) => ({
    ballRotation: state.ballRotation
      .randomDirection()
      .multiplyScalar(between(1, 5))
  }))

export const initializeGameplay = () => {
  store.set({
    playerScore: 0,
    enemyScore: 0,
    ballActive: true
  })

  randomizeBallRotation()
}

export const startRound = () => {
  store.set({
    ballDirection: store.state.ballDirection.set(
      chance() ? 1 : -1,
      chance() ? 1 : -1
    )
  })
}

export const endRound = () => {
  store.set({
    ballActive: false
  })
}
