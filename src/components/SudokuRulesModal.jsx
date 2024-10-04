import React from 'react'
import { X } from 'lucide-react'

const SudokuRulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Sudoku Rules</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <p>Standard Sudoku Rules:</p>
          <ul className="pl-5 space-y-2 list-disc">
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
