import { ECS } from "./state"

export const Entities = () => (
  <ECS.ManagedEntities tag="render">
    {(entity) => entity.render}
  </ECS.ManagedEntities>
)
