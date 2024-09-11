/* src/models/Cell.js */
export class Cell {
  constructor(value = 0, color = 'white', cornerDigits = [], centerDigits = []) {
    this.value = value
    this.color = color
    this.cornerDigits = cornerDigits
    this.centerDigits = centerDigits
  }

  setValue(value) {
    this.value = value
    if (value !== 0) {
      this.cornerDigits = []
      this.centerDigits = []
    }
  }

  setColor(color) {
    this.color = color
  }

  toggleCornerDigit(digit) {
    const index = this.cornerDigits.indexOf(digit)
    if (index === -1) {
      this.cornerDigits = [...this.cornerDigits, digit].sort((a, b) => a - b).slice(0, 4)
    } else {
      this.cornerDigits.splice(index, 1)
    }
  }

  toggleCenterDigit(digit) {
    const index = this.centerDigits.indexOf(digit)
    if (index === -1) {
      this.centerDigits = [...this.centerDigits, digit].sort((a, b) => a - b)
    } else {
      this.centerDigits.splice(index, 1)
    }
  }

  clearDigits() {
    this.cornerDigits = []
    this.centerDigits = []
  }

  toJSON() {
    return {
      value: this.value,
      color: this.color,
      cornerDigits: this.cornerDigits,
      centerDigits: this.centerDigits,
    }
  }
}
