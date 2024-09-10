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
  const [isCalculating, setIsCalculating] = useState(false)
  const cellRefs = useRef([])
  const workerRef = useRef(null)
  const timerRef = useRef(null)

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
    // Initialize the worker
    workerRef.current = new Worker('sudokuWorker.js')

    // Set up the message and error handlers
    workerRef.current.onmessage = (e) => {
      setStatus(`Number of solutions: ${e.data}`)
      setIsCalculating(false)
    }

    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error)
      setStatus('Error calculating solutions')
      setIsCalculating(false)
    }

    // Clean up the worker when the component unmounts
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, []) // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    setInvalidCells(updateInvalidCells(board))

    // Clear the previous timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // Set a new timer
    timerRef.current = setTimeout(() => {
      setIsCalculating(true)
      workerRef.current.postMessage(board)
    }, 500)

    // Clean up the timer when the board changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [board])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-8">
      <div className="grid grid-cols-9 grid-rows-9 gap-0 bg-black w-full h-full max-w-[80vmin] max-h-[80vmin] aspect-square">
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
      <StatusBar status={status} isCalculating={isCalculating} />
    </div>
  )
}

export default SudokuBoard
