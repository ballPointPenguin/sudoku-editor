// src/models/__tests__/Board.test.js
import { Board } from '../Board'
import { describe, test, expect, beforeEach } from 'vitest'

describe('Board', () => {
  let board

  beforeEach(() => {
    board = new Board()
  })

  test('initializes with 81 empty cells', () => {
    expect(board.cells.flat()).toHaveLength(81)
    expect(board.cells.flat().every((cell) => cell.value === 0)).toBe(true)
  })

  test('setCellValue updates cell value', () => {
    board.setCellValue(0, 0, 5)
    expect(board.getCell(0, 0).value).toBe(5)
  })

  test('isValidPlacement correctly identifies valid and invalid placements', () => {
    board.setCellValue(0, 0, 5)
    expect(board.isValidPlacement(0, 1, 5)).toBe(false)
    expect(board.isValidPlacement(0, 1, 6)).toBe(true)
  })

  test('findInvalidCells returns correct set of invalid cells', () => {
    board.setCellValue(0, 0, 5)
    board.setCellValue(0, 1, 5)
    const invalidCells = board.findInvalidCells()
    expect(invalidCells.size).toBe(2)
    expect(invalidCells.has('0,0')).toBe(true)
    expect(invalidCells.has('0,1')).toBe(true)
  })

  test('clone creates a deep copy of the board', () => {
    board.setCellValue(0, 0, 5)
    const clonedBoard = board.clone()
    expect(clonedBoard.getCell(0, 0).value).toBe(5)
    clonedBoard.setCellValue(0, 0, 6)
    expect(board.getCell(0, 0).value).toBe(5)
    expect(clonedBoard.getCell(0, 0).value).toBe(6)
  })
})
