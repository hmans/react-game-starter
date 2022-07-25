import { Controller } from "@hmans/controlfreak"
import { createECS } from "miniplex-react"
import { makeStore } from "statery"
import { ICollisionComponents } from "../../lib/miniplex-game/collisions"
import { ITransformComponents } from "../../lib/miniplex-game/transform"
import { IVelocityComponents } from "../../lib/miniplex-game/velocity"

type Entity = {
  controller?: Controller
  paddle?: {}
  ball?: {}
} & ITransformComponents &
  ICollisionComponents &
  IVelocityComponents

export const ECS = createECS<Entity>()

export const store = makeStore({
  playerScore: 0,
  enemyScore: 0
})

export const increasePlayerScore = () =>
  store.set(({ playerScore }) => ({ playerScore: playerScore + 1 }))

export const increaseEnemyScore = () =>
  store.set(({ enemyScore }) => ({ enemyScore: enemyScore + 1 }))
