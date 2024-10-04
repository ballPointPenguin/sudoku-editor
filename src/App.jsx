// src/App.jsx
import { useState } from 'react'
import SudokuBoard from './components/SudokuBoard'
import SudokuMetadata from './components/SudokuMetadata'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="mx-auto px-4 sm:py-8 container">
        <header className="flex justify-between items-center sm:mb-8 p-4 sm:p-8">
          <span className="basis-1/4"></span>
          <h1 className="mx-auto font-bold text-center text-xl sm:text-3xl basis-1/2">
            Bennie&apos;s Board Builder
          </h1>
          <div className="text-right basis-1/4">
            <ThemeSwitcher />
          </div>
        </header>
        <main>
          <SudokuBoard />
          <SudokuMetadata
            title={title}
            author={author}
            description={description}
            onTitleChange={setTitle}
            onAuthorChange={setAuthor}
            onDescriptionChange={setDescription}
          />
        </main>
      </div>
    </div>
  )
}

export default App
