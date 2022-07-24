import { createECS } from "miniplex-react"
import { ReactElement } from "react"
import { Object3D } from "three"

type Entity = {
  render?: ReactElement
}

export const ECS = createECS<Entity>()
