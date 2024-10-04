//src/utils/storageUtils.js

const STORAGE_KEY = 'sudoku-board-state'

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (err) {
    console.error('Could not save state', err)
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Could not load state', err)
    return undefined
  }
}

export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Could not clear state', err)
  }
}
