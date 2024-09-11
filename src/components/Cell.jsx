// src/components/Cell.jsx
import { forwardRef } from 'react'

const colorClasses = {
  red: 'bg-red-500 dark:bg-red-700',
  orange: 'bg-orange-500 dark:bg-orange-700',
  yellow: 'bg-yellow-500 dark:bg-yellow-600',
  green: 'bg-green-500 dark:bg-green-700',
  teal: 'bg-teal-500 dark:bg-teal-700',
  blue: 'bg-blue-500 dark:bg-blue-700',
  indigo: 'bg-indigo-500 dark:bg-indigo-700',
  purple: 'bg-purple-500 dark:bg-purple-700',
  pink: 'bg-pink-500 dark:bg-pink-700',
  white: 'bg-white dark:bg-gray-800',
  gray: 'bg-gray-400 dark:bg-gray-600',
  black: 'bg-gray-800 dark:bg-white',
}

const Cell = forwardRef(
  ({ row, col, cellData, isValid, onChange, onKeyDown, onPointerDown, onPointerEnter }, ref) => {
    const { value, color, cornerDigits, centerDigits } = cellData

    const renderCornerDigits = () => {
      return (
        <div className="absolute inset-0 flex flex-col justify-between text-[2vmin] pointer-events-none">
          <div className="flex justify-between">
            <span className="pl-[0.5vmin]">{cornerDigits[0]}</span>
            <span className="pr-[0.5vmin]">{cornerDigits[1]}</span>
          </div>
          <div className="flex justify-between">
            <span className="pl-[0.5vmin]">{cornerDigits[2]}</span>
            <span className="pr-[0.5vmin]">{cornerDigits[3]}</span>
          </div>
        </div>
      )
    }

    const renderCenterDigits = () => {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-[1.5vmin] pointer-events-none">
          <span className="text-center">{centerDigits.join('')}</span>
        </div>
      )
    }

    return (
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
        onPointerDown={onPointerDown}
        onPointerEnter={onPointerEnter}
        style={{ touchAction: 'none' }}
      >
        <input
          ref={ref}
          aria-label={`Row ${row + 1}, Column ${col + 1}`}
          className={`
            w-full h-full
            flex justify-center items-center
            text-[3vmin] font-bold text-center
            p-0 box-border
            ${colorClasses[color] || 'bg-white dark:bg-gray-800'}
            ${!isValid ? 'ring-2 ring-rose-500 text-rose-700 dark:ring-rose-700 dark:text-rose-500' : ''}
            ${color === 'white' ? 'text-gray-800 dark:text-white' : 'text-white dark:text-gray-800'}
            group-[.focused]:ring-2 group-[.focused]:ring-blue-500 dark:group-[.focused]:ring-blue-300
            focus:outline-none
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
        {value === 0 && renderCornerDigits()}
        {value === 0 && renderCenterDigits()}
      </div>
    )
  },
)

Cell.displayName = 'Cell'

export default Cell
