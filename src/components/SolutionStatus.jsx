/* src/components/SolutionStatus.jsx */
import React from 'react'
import StatusBar from './StatusBar'

const SolutionStatus = ({ status, isCalculating }) => {
  return <StatusBar status={status} isCalculating={isCalculating} />
}

export default React.memo(SolutionStatus)
