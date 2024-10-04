// src/components/ConstraintPanel.jsx
import React from 'react'

const ConstraintPanel = ({ constraints, toggleConstraint }) => {
  return (
    <div className="p-4 mt-4 bg-gray-100 rounded-lg dark:bg-gray-700">
      <h3 className="mb-2 text-lg font-semibold">Constraints</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded ${
            constraints.positiveDiagonal
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
          }`}
          onClick={() => toggleConstraint('positiveDiagonal')}
        >
          Diagonal +
        </button>
        <button
          className={`px-3 py-1 rounded ${
            constraints.negativeDiagonal
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
          }`}
          onClick={() => toggleConstraint('negativeDiagonal')}
        >
          Diagonal -
        </button>
      </div>
    </div>
  )
}

export default React.memo(ConstraintPanel)
