import { createStore } from "redux"
import authReducer from "./reducer"

import { getAuthFromStore } from "../services/authService"

const loadState = () => {
  const authToken = getAuthFromStore()
  if (!authToken) return
  try {
    const serializedState = localStorage.getItem(authToken)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const saveState = state => {
  const authToken = getAuthFromStore()
  if (!authToken) return
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(authToken, serializedState)
  } catch {
    // ignore write errors
  }
}

const preloadedState = loadState()

const store = createStore(
  authReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
