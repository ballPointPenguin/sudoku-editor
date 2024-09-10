// Basic structure for Sudoku grid
const EMPTY = 0
const SIZE = 9

function isValid(board, row, col, num) {
  // Check row
  for (let x = 0; x < SIZE; x++) {
    if (board[row][x] === num) return false
  }

  // Check column
  for (let x = 0; x < SIZE; x++) {
    if (board[x][col] === num) return false
  }

  // Check box
  let boxRow = Math.floor(row / 3) * 3
  let boxCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false
    }
  }

  return true
}

function findEmpty(board) {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] === EMPTY) return [i, j]
    }
  }
  return null
}

function countSolutions(board, maxSolutions = 100_000, timeLimit = 2000) {
  let solutions = 0
  const startTime = Date.now()

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
        board[row][col] = num
        solve()
        board[row][col] = EMPTY
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

// Usage:
// const board = [
//   [5,3,0,0,7,0,0,0,0],
//   [6,0,0,1,9,5,0,0,0],
//   [0,9,8,0,0,0,0,6,0],
//   [8,0,0,0,6,0,0,0,3],
//   [4,0,0,8,0,3,0,0,1],
//   [7,0,0,0,2,0,0,0,6],
//   [0,6,0,0,0,0,2,8,0],
//   [0,0,0,4,1,9,0,0,5],
//   [0,0,0,0,8,0,0,7,9]
// ];
// console.log(countSolutions(board));
