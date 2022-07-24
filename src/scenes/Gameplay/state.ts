import { Controller } from "@hmans/controlfreak"
import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { ReactElement } from "react"
import { Object3D, Vector2 } from "three"
import { Rect } from "../../lib/Rect"
import { makeStore } from "statery"

type Entity = {
  isBall?: Tag
  isPaddle?: Tag
  render?: ReactElement
  transform?: Object3D
  controller?: Controller

  ball?: {
    bounds: Rect
  }

  velocity?: Vector2
  bounds?: Rect
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
