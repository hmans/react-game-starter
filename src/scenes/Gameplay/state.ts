import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { ReactElement } from "react"
import { Box2, Object3D, Vector2 } from "three"

type Entity = {
  isBall?: Tag
  render?: ReactElement
  transform?: Object3D

  velocity?: Vector2
  area?: Box2
}

export const ECS = createECS<Entity>()
