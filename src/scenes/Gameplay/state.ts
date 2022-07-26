import { Controller } from "@hmans/controlfreak"
import { createECS } from "miniplex-react"
import { makeStore } from "statery"
import { Object3D, Vector2 } from "three"

type Entity = {
  controller?: Controller
  paddle?: {
    speed: number
  }
  ball?: {}

  transform?: Object3D
  velocity?: Vector2
}

export const ECS = createECS<Entity>()

export const store = makeStore({
  playerScore: 0,
  enemyScore: 0
})

export const increasePlayerScore = () =>
  store.set(({ playerScore }) => ({ playerScore: playerScore + 1 }))

export const increaseEnemyScore = () =>
  store.set(({ enemyScore }) => ({ enemyScore: enemyScore + 1 }))
