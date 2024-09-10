import SudokuBoard from './components/SudokuBoard'

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-100">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Bennie&apos;s Board Builder</h1>
      </header>
      <main>
        <SudokuBoard />
      </main>
    </div>
  )
}

export default App
