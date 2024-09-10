/* src/components/StatusBar.jsx */
const LoadingDots = () => (
  <span className="loading-dots">
    <span className="dot">.</span>
    <span className="dot">.</span>
    <span className="dot">.</span>
  </span>
)

const StatusBar = ({ status, isCalculating }) => (
  <div
    className="
    flex justify-center items-center mt-5 text-lg h-10 w-full max-w-[80vmin] 
    bg-gray-100 dark:bg-gray-900 rounded-md px-2.5
  "
  >
    {isCalculating ? (
      <span>
        Recalculating <LoadingDots />
      </span>
    ) : (
      status
    )}
  </div>
)

export default StatusBar
