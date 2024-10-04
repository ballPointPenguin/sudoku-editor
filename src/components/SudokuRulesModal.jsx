import React from 'react'
import { X } from 'lucide-react'

const SudokuRulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">Sudoku Rules</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <p>Standard Sudoku Rules:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Each row must contain the numbers 1-9 without repetition.</li>
            <li>Each column must contain the numbers 1-9 without repetition.</li>
            <li>Each 3x3 box must contain the numbers 1-9 without repetition.</li>
          </ul>
          <p>Additional constraints can be enabled in the Constraints panel.</p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SudokuRulesModal)
