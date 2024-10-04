// src/components/Board.jsx
import React from 'react'
import Cell from './Cell'

const Board = ({
  board,
  invalidCells,
  cellRefs,
  handleCellChange,
  handleKeyDown,
  handlePointerDown,
  handlePointerEnter,
  handlePointerUp,
  constraints,
}) => {
  return (
    <div
      className="relative gap-0 grid grid-cols-9 grid-rows-9 w-full max-w-[80vmin] h-full max-h-[80vmin] aspect-square"
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {board.cells.map((row, rowIndex) =>
        row.map((cellData, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            ref={(el) => (cellRefs.current[rowIndex * 9 + colIndex] = el)}
            row={rowIndex}
            col={colIndex}
            cellData={cellData}
            isValid={!invalidCells.has(`${rowIndex}-${colIndex}`)}
            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
            onPointerDown={() => handlePointerDown(rowIndex, colIndex)}
            onPointerEnter={() => handlePointerEnter(rowIndex, colIndex)}
          />
        )),
      )}
      {constraints.positiveDiagonal && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="border-b-2 border-blue-500 w-[141%] h-full origin-bottom-left -rotate-45"></div>
        </div>
      )}
      {constraints.negativeDiagonal && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="border-t-2 border-blue-500 w-[141%] h-[100%] origin-top-left rotate-45"></div>
        </div>
      )}
    </div>
  )
}

export default React.memo(Board)
