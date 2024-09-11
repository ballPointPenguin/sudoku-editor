/* src/components/SudokuBoard.jsx */
import { addCornerDigit, addCenterDigit, updateInvalidCells } from '../utils/sudokuUtils'
import { useCallback, useEffect, useRef, useState } from 'react'
import Board from './Board'
import ColorPicker from './ColorPicker'
import ControlPanel from './ControlPanel'
import SolutionStatus from './SolutionStatus'

const SudokuBoard = () => {
  const [board, setBoard] = useState(
    Array(9)
      .fill()
      .map(() =>
        Array(9).fill({
          value: 0,
          color: 'white',
          cornerDigits: [],
          centerDigits: [],
        }),
      ),
  )

  const [invalidCells, setInvalidCells] = useState(new Set())
  const [isCalculating, setIsCalculating] = useState(false)
  const [isColoring, setIsColoring] = useState(false)
  const [mode, setMode] = useState('normal') // 'normal' or 'corner' or 'center'
  const [selectedColor, setSelectedColor] = useState('white')
  const [status, setStatus] = useState('Initializing...')
  const cellRefs = useRef([])
  const timerRef = useRef(null)
  const workerRef = useRef(null)

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
        const newBoard = board.map((r) => r.map((c) => ({ ...c })))
        newBoard[row][col].value = value === '' ? 0 : parseInt(value)
        if (newBoard[row][col].value !== 0) {
          newBoard[row][col].cornerDigits = []
          newBoard[row][col].centerDigits = []
        }
        setBoard(newBoard)
      }
    },
    [board],
  )

  const handleCellColor = useCallback(
    (row, col) => {
      const newBoard = board.map((r) => r.map((c) => ({ ...c })))
      newBoard[row][col].color = selectedColor
      setBoard(newBoard)
    },
    [board, selectedColor],
  )

  const handlePointerDown = useCallback(
    (row, col) => {
      setIsColoring(true)
      handleCellColor(row, col)
    },
    [handleCellColor],
  )

  const handlePointerEnter = useCallback(
    (row, col) => {
      if (isColoring) {
        handleCellColor(row, col)
      }
    },
    [isColoring, handleCellColor],
  )

  const handlePointerUp = useCallback(() => {
    setIsColoring(false)
  }, [])

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
      }

      if (event.key === ' ') {
        event.preventDefault()
        handleCellChange(row, col, '')
        moveFocus(row, col, 0, 1)
      }

      if (event.key >= '1' && event.key <= '9') {
        event.preventDefault()
        if (mode === 'normal') {
          handleCellChange(row, col, event.key)
          moveFocus(row, col, 0, 1)
        }

        if (mode === 'corner') {
          const newBoard = addCornerDigit(board, row, col, parseInt(event.key))
          setBoard(newBoard)
        }

        if (mode === 'center') {
          const newBoard = addCenterDigit(board, row, col, parseInt(event.key))
          setBoard(newBoard)
        }
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault()

        if (mode === 'normal') {
          if (board[row][col].value === 0) {
            moveFocus(row, col, 0, -1)
          } else {
            handleCellChange(row, col, '')
          }
        }

        if (mode === 'corner') {
          const newBoard = board.map((r) => r.map((c) => ({ ...c })))
          newBoard[row][col].cornerDigits = []
          setBoard(newBoard)
        }

        if (mode === 'center') {
          const newBoard = board.map((r) => r.map((c) => ({ ...c })))
          newBoard[row][col].centerDigits = []
          setBoard(newBoard)
        }
      }
    },
    [board, mode, handleCellChange, moveFocus],
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

  useEffect(() => {
    const handleGlobalPointerUp = () => setIsColoring(false)
    window.addEventListener('pointerup', handleGlobalPointerUp)
    window.addEventListener('pointercancel', handleGlobalPointerUp)
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp)
      window.removeEventListener('pointercancel', handleGlobalPointerUp)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-8">
      <ColorPicker selectedColor={selectedColor} onColorSelect={setSelectedColor} />
      <Board
        board={board}
        invalidCells={invalidCells}
        cellRefs={cellRefs}
        handleCellChange={handleCellChange}
        handleKeyDown={handleKeyDown}
        handlePointerDown={handlePointerDown}
        handlePointerEnter={handlePointerEnter}
        handlePointerUp={handlePointerUp}
      />
      <SolutionStatus status={status} isCalculating={isCalculating} />
      <ControlPanel mode={mode} setMode={setMode} />
    </div>
  )
}

export default SudokuBoard
