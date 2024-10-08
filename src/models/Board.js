// src/models/Board.js
import { Cell } from './Cell'

export class Board {
  constructor(size = 9, initialState = null) {
    this.size = size

    if (initialState) {
      this.cells = initialState.map((row) =>
        row.map(
          (cellData) =>
            new Cell(cellData.value, cellData.color, cellData.cornerDigits, cellData.centerDigits),
        ),
      )
    } else {
      this.cells = Array(size)
        .fill()
        .map(() =>
          Array(size)
            .fill()
            .map(() => new Cell()),
        )
    }
  }

  clone() {
    const newBoard = new Board(this.size)
    newBoard.cells = this.cells.map((row) =>
      row.map(
        (cell) => new Cell(cell.value, cell.color, [...cell.cornerDigits], [...cell.centerDigits]),
      ),
    )

    return newBoard
  }

  getCell(row, col) {
    return this.cells[row][col]
  }

  setCellValue(row, col, value) {
    this.cells[row][col].setValue(value)
  }

  setCellColor(row, col, color) {
    this.cells[row][col].setColor(color)
  }

  toggleCornerDigit(row, col, digit) {
    this.cells[row][col].toggleCornerDigit(digit)
  }

  toggleCenterDigit(row, col, digit) {
    this.cells[row][col].toggleCenterDigit(digit)
  }

  clearCellDigits(row, col) {
    this.cells[row][col].clearDigits()
  }

  isValidPlacement(row, col, num) {
    // Check row
    for (let x = 0; x < this.size; x++) {
      if (x !== col && this.cells[row][x].value === num) return false
    }

    // Check column
    for (let x = 0; x < this.size; x++) {
      if (x !== row && this.cells[x][col].value === num) return false
    }

    // Check 3x3 box
    let boxRow = Math.floor(row / 3) * 3
    let boxCol = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          boxRow + i !== row &&
          boxCol + j !== col &&
          this.cells[boxRow + i][boxCol + j].value === num
        )
          return false
      }
    }

    // Check diagonal constraints
    if (row === col && !this.isValidPositiveDiagonal(row, col, num)) return false
    if (row + col === this.size - 1 && !this.isValidNegativeDiagonal(row, col, num)) return false

    return true
  }

  isValidPositiveDiagonal(row, col, num) {
    for (let i = 0; i < this.size; i++) {
      if (i !== row && this.cells[i][i].value === num) return false
    }

    return true
  }

  isValidNegativeDiagonal(row, col, num) {
    for (let i = 0; i < this.size; i++) {
      if (i !== row && this.cells[i][this.size - 1 - i].value === num) return false
    }

    return true
  }

  findInvalidCells() {
    const invalidCells = new Set()
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const cellValue = this.cells[row][col].value
        if (cellValue !== 0 && !this.isValidPlacement(row, col, cellValue)) {
          invalidCells.add(`${row},${col}`)
        }
      }
    }

    return invalidCells
  }

  toJSON() {
    return this.cells.map((row) => row.map((cell) => cell.toJSON()))
  }
}
