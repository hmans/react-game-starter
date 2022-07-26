import { makeFSM } from "../lib/makeFSM"

type State = "title" | "gameplay"

const { MatchState, enterState, isCurrentState } = makeFSM<State>("title")

export { MatchState }

export const enterGameplay = () =>
  isCurrentState("title") && enterState("gameplay")
