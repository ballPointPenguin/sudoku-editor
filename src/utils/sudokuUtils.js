const isValidPlacement = (board, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (x !== col && board[row][x] === num) return false
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (x !== row && board[x][col] === num) return false
  }

  // Check 3x3 box
  let boxRow = Math.floor(row / 3) * 3
  let boxCol = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (boxRow + i !== row && boxCol + j !== col && board[boxRow + i][boxCol + j] === num)
        return false
    }
  }

  return true
}

export const updateInvalidCells = (board) => {
  const newInvalidCells = new Set()
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0 && !isValidPlacement(board, row, col, board[row][col])) {
        newInvalidCells.add(`${row}-${col}`)
      }
    }
  }
  return newInvalidCells
}
