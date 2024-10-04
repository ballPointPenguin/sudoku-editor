// src/components/ConstraintPanel.jsx
import React from 'react'
import { Info } from 'lucide-react'

const constraintInfo = {
  positiveDiagonal:
    'Numbers must not repeat on the positive diagonal. The positive diagonal covers 9 cells from bottom-left to top-right.',
  negativeDiagonal:
    'Numbers must not repeat on the negative diagonal. The negative diagonal covers 9 cells from top-left to bottom-right.',
  antiKnight: "Cells that are a chess knight's move apart must not contain the same number.",
  antiKing: "Cells that are a chess king's move apart must not contain the same number.",
  disjointGroups:
    'Cells that appear in the same position relative to their default regions must not contain the same number.',
  nonConsecutive: 'Orthogonally adjacent cells must not contain consecutive numbers.',
}

const ConstraintPanel = ({ constraints, toggleConstraint, setInfoText }) => {
  const handleConstraintClick = (constraint) => {
    toggleConstraint(constraint)
    setInfoText(constraintInfo[constraint])
  }

  const renderConstraintButton = (constraint, label) => (
    <button
      className={`px-3 py-1 rounded flex items-center ${
        constraints[constraint]
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
      }`}
      onClick={() => handleConstraintClick(constraint)}
    >
      {label}
      <Info
        size={16}
        className="ml-1 cursor-help"
        onMouseEnter={() => setInfoText(constraintInfo[constraint])}
        onMouseLeave={() => setInfoText('')}
      />
    </button>
  )

  return (
    <div className="p-4 mt-4 bg-gray-100 rounded-lg dark:bg-gray-700">
      <h3 className="mb-2 text-lg font-semibold">Constraints</h3>
      <div className="flex flex-wrap gap-2">
        {renderConstraintButton('positiveDiagonal', 'Diagonal +')}
        {renderConstraintButton('negativeDiagonal', 'Diagonal -')}
        {renderConstraintButton('antiKnight', 'Anti-Knight')}
        {renderConstraintButton('antiKing', 'Anti-King')}
        {renderConstraintButton('disjointGroups', 'Disjoint Groups')}
        {renderConstraintButton('nonConsecutive', 'Non-Consecutive')}
      </div>
    </div>
  )
}

export default React.memo(ConstraintPanel)
