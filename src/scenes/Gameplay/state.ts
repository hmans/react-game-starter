import { createECS } from "miniplex-react"
import { Object3D } from "three"

type Entity = {
  transform?: Object3D
}

export const ECS = createECS<Entity>()
