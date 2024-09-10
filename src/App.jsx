import SudokuBoard from './components/SudokuBoard'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-gray-800 dark:text-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <header className="flex items-center justify-between p-4 mb-8 sm:p-8">
          <span className="basis-1/4"></span>
          <h1 className="mx-auto text-3xl font-bold text-center basis-1/2">
            Bennie&apos;s Board Builder
          </h1>
          <div className="text-right basis-1/4">
            <ThemeSwitcher />
          </div>
        </header>
        <main>
          <SudokuBoard />
        </main>
      </div>
    </div>
  )
}

export default App
