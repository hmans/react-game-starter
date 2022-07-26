import { Ref, useLayoutEffect, useRef, useState } from "react"
import { Listener, makeStore, State, Store } from "statery"
import { Object3D, Vector2 } from "three"

const useConst = <T>(ctor: () => T) => {
  const ref = useRef<T>(null!)
  if (!ref.current) ref.current = ctor()
  return ref.current
}

/**
 * Provides reactive read access to a Statery store. Returns a proxy object that
 * provides direct access to the store's state and makes sure that the React component
 * it was invoked from automaticaly re-renders when any of the data it uses is updated.
 *
 * @param store The Statery store to access.
 */
export const useStore = <T extends State>(store: Store<T>): T => {
  /* A cheap version state that we will bump in order to re-render the component. */
  const [, setVersion] = useState(0)

  /* A set containing all props that we're interested in. */
  const subscribedProps = useConst(() => new Set<keyof T>())

  /* Subscribe to changes in the store. */
  useLayoutEffect(() => {
    const listener: Listener<T> = (updates: Partial<T>) => {
      /* If there is at least one prop being updated that we're interested in,
         bump our local version. */
      if (Object.keys(updates).find((prop) => subscribedProps.has(prop))) {
        setVersion((v) => v + 1)
      }
    }

    /* Mount & unmount the listener */
    store.subscribe(listener)
    return () => void store.unsubscribe(listener)
  }, [store])

  return new Proxy<Record<any, any>>(
    {},
    {
      get: (_, prop: string) => {
        /* Add the prop we're interested in to the list of props */
        subscribedProps.add(prop)

        /* Return the current value of the property. */
        return store.state[prop]
      }
    }
  )
}

export const store = makeStore({
  playerScore: 0,
  enemyScore: 0,
  intensity: 0,

  player: null as Object3D | null,
  enemy: null as Object3D | null,

  ball: null as Object3D | null,
  ballDirection: new Vector2(1, 1).normalize(),
  ballSpeed: 12
})

export const useGameplayStore = () => useStore(store)

export const setGameObject =
  <O extends Object3D>(name: keyof typeof store.state): Ref<O> =>
  (object) => {
    console.log("Setting game object", name, object)
    store.set({ [name]: object })
  }

export const increasePlayerScore = () =>
  store.set(({ playerScore }) => ({ playerScore: playerScore + 1 }))

export const increaseEnemyScore = () =>
  store.set(({ enemyScore }) => ({ enemyScore: enemyScore + 1 }))

export const setIntensity = (intensity: number) =>
  store.set({ intensity: Math.max(store.state.intensity, intensity) })
