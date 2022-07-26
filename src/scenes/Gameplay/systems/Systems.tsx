import { BallSystem } from "./BallSystem"
import { CameraSystem } from "./CameraSystem"
import { EnemySystem } from "./EnemySystem"
import { PaddleSystem } from "./PaddleSystem"
import { VFXSystem } from "./VFXSystem"

export const Systems = () => (
  <>
    <BallSystem />
    <EnemySystem />
    <PaddleSystem />
    <CameraSystem />
    <VFXSystem />
  </>
)
