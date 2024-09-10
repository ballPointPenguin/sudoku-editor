/* src/components/Cell.jsx */
import { forwardRef } from 'react'

const Cell = forwardRef(({ value, onChange, onKeyDown, isValid, row, col }, ref) => (
  <div
    className={`
      group
      w-full h-full aspect-square relative
      border-r border-b border-gray-300 dark:border-gray-600
      ${col % 3 === 2 ? 'border-r-2 border-r-black dark:border-r-white' : ''}
      ${row % 3 === 2 ? 'border-b-2 border-b-black dark:border-b-white' : ''}
      ${col === 0 ? 'border-l-2 border-l-black dark:border-l-white' : ''}
      ${row === 0 ? 'border-t-2 border-t-black dark:border-t-white' : ''}
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
        ${isValid ? 'bg-white dark:bg-gray-800 text-black dark:text-white' : 'bg-rose-300 dark:bg-rose-800'}
        group-[.focused]:bg-blue-100 dark:group-[.focused]:bg-blue-900
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300
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
