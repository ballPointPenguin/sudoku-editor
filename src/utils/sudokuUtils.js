// src/utils/sudokuUtils.js
export const addCornerDigit = (board, row, col, digit) => {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })))
  const cell = newBoard[row][col]

  if (cell.value === 0) {
    const index = cell.cornerDigits.indexOf(digit)
    if (index === -1) {
      cell.cornerDigits = [...cell.cornerDigits, digit].sort((a, b) => a - b).slice(0, 4)
    } else {
      cell.cornerDigits.splice(index, 1)
    }
  }

  return newBoard
}

export const addCenterDigit = (board, row, col, digit) => {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })))
  const cell = newBoard[row][col]

  if (cell.value === 0) {
    const index = cell.centerDigits.indexOf(digit)
    if (index === -1) {
      cell.centerDigits = [...cell.centerDigits, digit].sort((a, b) => a - b)
    } else {
      cell.centerDigits.splice(index, 1)
    }
  }

  return newBoard
}

const isValidPlacement = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (x !== col && board[row][x].value === num) return false
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (x !== row && board[x][col].value === num) return false
  }

  // Check 3x3 box
  let boxRow = Math.floor(row / 3) * 3
  let boxCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (boxRow + i !== row && boxCol + j !== col && board[boxRow + i][boxCol + j].value === num)
        return false
    }
  }

  return true
}

export const updateInvalidCells = (board) => {
  const newInvalidCells = new Set()
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (
        board[row][col].value !== 0 &&
        !isValidPlacement(board, row, col, board[row][col].value)
      ) {
        newInvalidCells.add(`${row}-${col}`)
      }
    }
  }
  return newInvalidCells
}
