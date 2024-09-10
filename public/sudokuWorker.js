/* public/sudokuWorker.js */
// Basic structure for Sudoku grid
const EMPTY = 0
const SIZE = 9
const THEORETICAL_MAX = 6_670_903_752_021_072_936_960n

function isValid(board, row, col, num) {
  // Check row
  for (let x = 0; x < SIZE; x++) {
    if (board[row][x].value === num) return false
  }

  // Check column
  for (let x = 0; x < SIZE; x++) {
    if (board[x][col].value === num) return false
  }

  // Check box
  let boxRow = Math.floor(row / 3) * 3
  let boxCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j].value === num) return false
    }
  }

  return true
}

function findEmpty(board) {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j].value === EMPTY) return [i, j]
    }
  }
  return null
}

/**
 * Counts the number of possible solutions for a given Sudoku board.
 *
 * @param {number[][]} board - A 2D array representing the Sudoku board, where { value: 0 } indicates an empty cell.
 * @param {number} [maxSolutions=100_000] - The maximum number of solutions to count before stopping.
 * @param {number} [timeLimit=2000] - The time limit in milliseconds to search for solutions.
 * @returns {number|string} The number of solutions found, or a string indicating that the number of solutions exceeds the maximum limit.
 */
function countSolutions(board, maxSolutions = 100_000, timeLimit = 2000) {
  let solutions = 0
  const startTime = Date.now()

  const isBlankBoard = board.every((row) => row.every((cell) => cell.value === 0))
  if (isBlankBoard) {
    return THEORETICAL_MAX
  }

  function solve() {
    if (solutions >= maxSolutions || Date.now() - startTime > timeLimit) {
      return
    }

    const find = findEmpty(board)
    if (!find) {
      solutions++
      return
    }

    const [row, col] = find

    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col].value = num
        solve()
        board[row][col].value = EMPTY
      }
    }
  }

  solve()
  return solutions >= maxSolutions ? `> ${maxSolutions}` : solutions
}

self.onmessage = function (e) {
  const board = e.data
  const solutions = countSolutions(board)
  self.postMessage(solutions)
}
