import { forwardRef } from 'react'

const Cell = forwardRef(({ value, onChange, onKeyDown, isValid, row, col }, ref) => (
  <div
    className={`
      group
      w-full h-full aspect-square relative
      border-r border-b border-gray-300
      ${col % 3 === 2 ? 'border-r-2 border-r-black' : ''}
      ${row % 3 === 2 ? 'border-b-2 border-b-black' : ''}
      ${col === 0 ? 'border-l-2 border-l-black' : ''}
      ${row === 0 ? 'border-t-2 border-t-black' : ''}
    `}
  >
    <input
      ref={ref}
      aria-label={`Row ${row + 1}, Column ${col + 1}`}
      className={`
        w-full h-full
        flex justify-center items-center
        text-[3vmin] font-bold text-center
        p-0 box-border
        ${isValid ? 'bg-white' : 'bg-red-100'}
        group-[.focused]:bg-blue-100
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
      value={value || ''}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={(e) => {
        e.target.parentNode.classList.add('focused')
      }}
      onBlur={(e) => {
        e.target.parentNode.classList.remove('focused')
      }}
      maxLength="1"
    />
  </div>
))

Cell.displayName = 'Cell'

export default Cell
