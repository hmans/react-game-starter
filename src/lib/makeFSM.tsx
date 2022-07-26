import { ReactNode } from "react"
import { makeStore, useStore } from "statery"

export const makeFSM = <S extends string>(initialState: S) => {
  const store = makeStore({
    state: initialState as S
  })

  const MatchState = ({
    state,
    children
  }: {
    state: S | S[]
    children?: ReactNode
  }) => {
    const { state: currentState } = useStore(store)

    const isCurrentState = Array.isArray(state)
      ? state.includes(currentState)
      : state === currentState

    return isCurrentState ? <>{children}</> : null
  }

  const enterState = (state: S) => {
    const { state: currentState } = store.state

    if (state && state !== currentState) {
      store.set({ state })
    }
  }

  const isCurrentState = (state: S | S[]) =>
    Array.isArray(state)
      ? state.includes(store.state.state)
      : store.state.state === state

  return {
    MatchState,
    enterState,
    isCurrentState
  }
}
