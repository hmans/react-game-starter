import { Controller } from "@hmans/controlfreak"
import { Tag } from "miniplex"
import { createECS } from "miniplex-react"
import { ReactElement } from "react"
import { Object3D, Vector2 } from "three"
import { Rect } from "../../lib/Rect"

type Entity = {
  isBall?: Tag
  isPaddle?: Tag
  render?: ReactElement
  transform?: Object3D
  controller?: Controller

  velocity?: Vector2
  area?: Rect
}

export const ECS = createECS<Entity>()
