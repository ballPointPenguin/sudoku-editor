// src/models/__tests__/Cell.test.js
import { Cell } from '../Cell'
import { describe, test, expect, beforeEach } from 'vitest'

describe('Cell', () => {
  let cell

  beforeEach(() => {
    cell = new Cell()
  })

  test('initializes with default values', () => {
    expect(cell.value).toBe(0)
    expect(cell.color).toBe('white')
    expect(cell.cornerDigits).toEqual([])
    expect(cell.centerDigits).toEqual([])
  })

  test('setValue updates value and clears digits', () => {
    cell.cornerDigits = [1, 2]
    cell.centerDigits = [3, 4]
    cell.setValue(5)
    expect(cell.value).toBe(5)
    expect(cell.cornerDigits).toEqual([])
    expect(cell.centerDigits).toEqual([])
  })

  test('toggleCornerDigit adds and removes digits correctly', () => {
    cell.toggleCornerDigit(1)
    expect(cell.cornerDigits).toEqual([1])
    cell.toggleCornerDigit(2)
    expect(cell.cornerDigits).toEqual([1, 2])
    cell.toggleCornerDigit(1)
    expect(cell.cornerDigits).toEqual([2])
  })

  test('toggleCenterDigit adds and removes digits correctly', () => {
    cell.toggleCenterDigit(1)
    expect(cell.centerDigits).toEqual([1])
    cell.toggleCenterDigit(2)
    expect(cell.centerDigits).toEqual([1, 2])
    cell.toggleCenterDigit(1)
    expect(cell.centerDigits).toEqual([2])
  })

  test('clearDigits removes all corner and center digits', () => {
    cell.cornerDigits = [1, 2]
    cell.centerDigits = [3, 4]
    cell.clearDigits()
    expect(cell.cornerDigits).toEqual([])
    expect(cell.centerDigits).toEqual([])
  })
})
