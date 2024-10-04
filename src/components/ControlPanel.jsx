// src/components/ControlPanel.jsx
import React from 'react'

const ControlPanel = ({ mode, setMode }) => {
  const buttons = [
    { label: 'Normal', value: 'normal' },
    { label: 'Corner', value: 'corner' },
    { label: 'Center', value: 'center' },
  ]

  return (
    <div className="flex space-x-2 mt-4">
      {buttons.map(({ label, value }) => (
        <button
          key={value}
          className={`px-4 py-2 rounded ${
            mode === value
              ? 'bg-blue-500 text-white dark:bg-blue-800'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
          onClick={() => setMode(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default React.memo(ControlPanel)
