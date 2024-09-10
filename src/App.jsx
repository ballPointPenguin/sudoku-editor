import './App.css'
import SudokuBoard from './components/SudokuBoard'

function App() {
  return (
    <>
      <h1>Bennie&apos;s Board Builder</h1>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <SudokuBoard />
      </div>
    </>
  )
}

export default App
