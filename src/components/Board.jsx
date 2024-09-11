/* src/components/Board.jsx */
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
}) => {
  return (
    <div
      className="grid grid-cols-9 grid-rows-9 gap-0 w-full h-full max-w-[80vmin] max-h-[80vmin] aspect-square"
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {board.flatMap((row, rowIndex) =>
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
    </div>
  )
}

export default React.memo(Board)
