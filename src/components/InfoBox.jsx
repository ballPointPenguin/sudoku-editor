// src/components/InfoBox.jsx
import React from 'react'

const InfoBox = ({ text }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 mt-4 p-4 rounded-lg w-full min-h-[6em] font-serif">
      <p className="text-sm">{text}</p>
    </div>
  )
}

export default React.memo(InfoBox)
