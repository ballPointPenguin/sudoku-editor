# Sudoku Variants and Constraints

## Standard Rules

- Each row must contain the numbers 1-9 without repetition.
- Each column must contain the numbers 1-9 without repetition.
- Each 3x3 box must contain the numbers 1-9 without repetition.

## Constraints

### Diagonal +

"Positive Diagonal"
Numbers must not repeat on the positive diagonal.
The positive diagonal covers 9 cells from bottom-left to top-right.

### Diagonal -

"Negative Diagonal"
Numbers must not repeat on the negative diagonal.
The negative diagonal covers 9 cells from top-left to bottom-right.

### Anti-Knight

Cells that are a chess knight's move apart must not contain the same number.

### Anti-King

Cells that are a chess king's move apart must not contain the same number.

### Disjoint Groups

Cells that appear in the same position relative to their default regions must not contain the same number.
That is, cells that appear in the same relative position within their 3x3 boxes (e.g. top-left, center, bottom-right) must not contain the same number.

### Non-Consecutive

Orthogonally adjacent cells must not contain consecutive numbers.
That is, the four cells to the left, right, above, and below a given cell must not contain consecutive numbers.
Thus for a cell with the number 8, the 4 cells that share a border with it must not contain 7 or 9.
