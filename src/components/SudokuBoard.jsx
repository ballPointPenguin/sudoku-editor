import { updateInvalidCells } from '../utils/sudokuUtils'
import { useCallback, useEffect, useRef, useState } from 'react'
import Cell from './Cell'
import StatusBar from './StatusBar'

const SudokuBoard = () => {
  const [board, setBoard] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(0)),
  )
  const [invalidCells, setInvalidCells] = useState(new Set())
  const [status, setStatus] = useState('Initializing...')
  const cellRefs = useRef([])

  const moveFocus = useCallback((row, col, dRow, dCol) => {
    const nextRow = row + dRow
    const nextCol = col + dCol
    if (nextRow >= 0 && nextRow < 9 && nextCol >= 0 && nextCol < 9) {
      cellRefs.current[nextRow * 9 + nextCol].focus()
    }
  }, [])

  const handleCellChange = useCallback(
    (row, col, value) => {
      if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
        const newBoard = board.map((r) => [...r])
        newBoard[row][col] = value === '' ? 0 : parseInt(value)
        setBoard(newBoard)
      }
    },
    [board],
  )

  const handleKeyDown = useCallback(
    (event, row, col) => {
      const keyActions = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      }

      if (event.key in keyActions) {
        event.preventDefault()
        const [dRow, dCol] = keyActions[event.key]
        moveFocus(row, col, dRow, dCol)
      } else if (event.key === ' ') {
        event.preventDefault()
        handleCellChange(row, col, '')
        moveFocus(row, col, 0, 1)
      } else if (event.key >= '1' && event.key <= '9') {
        event.preventDefault()
        handleCellChange(row, col, event.key)
        moveFocus(row, col, 0, 1)
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault()
        if (board[row][col] === 0) {
          moveFocus(row, col, 0, -1)
        } else {
          handleCellChange(row, col, '')
        }
      }
    },
    [board, handleCellChange, moveFocus],
  )

  useEffect(() => {
    setInvalidCells(updateInvalidCells(board))

    const worker = new Worker('sudokuWorker.js')

    worker.onmessage = (e) => {
      setStatus(`Number of solutions: ${e.data}`)
    }

    const timerId = setTimeout(() => {
      worker.postMessage(board)
    }, 500)

    return () => {
      clearTimeout(timerId)
      worker.terminate()
    }
  }, [board])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="grid grid-cols-9 grid-rows-9 gap-0 bg-black w-[80vmin] h-[80vmin] max-w-full max-h-full">
        {board.flatMap((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              ref={(el) => (cellRefs.current[rowIndex * 9 + colIndex] = el)}
              value={value}
              onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
              isValid={!invalidCells.has(`${rowIndex}-${colIndex}`)}
              row={rowIndex}
              col={colIndex}
            />
          )),
        )}
      </div>
      <StatusBar status={status} />
    </div>
  )
}

export default SudokuBoard
