import { forwardRef } from 'react'

const Cell = forwardRef(
  ({ value, onChange, onKeyDown, onFocus, onBlur, isValid, isFocused }, ref) => (
    <input
      ref={ref}
      className={`
        w-full h-full flex justify-center items-center text-[3vmin] font-bold text-center p-0 box-border
        ${isValid ? 'bg-white' : 'bg-red-100'}
        ${isFocused ? 'bg-blue-100' : ''}
        focus:outline-none focus:ring-2 focus:ring-blue-500
        [&:nth-child(3n)]:border-r-2 [&:nth-child(3n)]:border-black
        [&:nth-child(n+19)]:nth-child(-n+27):border-b-2 [&:nth-child(n+19)]:nth-child(-n+27):border-black
        [&:nth-child(n+46)]:nth-child(-n+54):border-b-2 [&:nth-child(n+46)]:nth-child(-n+54):border-black
        `}
      value={value || ''}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength="1"
    />
  ),
)

Cell.displayName = 'Cell'

export default Cell
