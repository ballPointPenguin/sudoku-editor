// src/App.jsx
import { useState, useEffect } from 'react'
import SudokuBoard from './components/SudokuBoard'
import SudokuMetadata from './components/SudokuMetadata'
import SudokuRulesModal from './components/SudokuRulesModal'
import ThemeSwitcher from './components/ThemeSwitcher'
import { saveState, loadState } from './utils/storageUtils'

function App() {
  const [metadata, setMetadata] = useState(() => {
    const savedState = loadState()
    const defaultMetadata = { title: '', author: '', description: '' }
    return savedState && savedState.metadata
      ? { ...defaultMetadata, ...savedState.metadata }
      : defaultMetadata
  })

  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)

  useEffect(() => {
    const savedState = loadState() || {}
    saveState({
      ...savedState,
      metadata,
    })
  }, [metadata])

  const handleTitleChange = (newTitle) => {
    setMetadata((prev) => ({ ...prev, title: newTitle }))
  }

  const handleAuthorChange = (newAuthor) => {
    setMetadata((prev) => ({ ...prev, author: newAuthor }))
  }

  const handleDescriptionChange = (newDescription) => {
    setMetadata((prev) => ({ ...prev, description: newDescription }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="mx-auto px-4 sm:py-8 container">
        <header className="flex justify-between items-center sm:mb-8 p-4 sm:p-8">
          <span className="basis-1/4"></span>
          <h1 className="mx-auto font-bold text-center text-xl sm:text-3xl basis-1/2">
            Bennie&apos;s Board Builder
          </h1>
          <button
            onClick={() => setIsRulesModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          >
            Rules
          </button>
          <div className="text-right basis-1/4">
            <ThemeSwitcher />
          </div>
        </header>
        <main>
          <SudokuBoard />
          <SudokuMetadata
            title={metadata.title}
            author={metadata.author}
            description={metadata.description}
            onTitleChange={handleTitleChange}
            onAuthorChange={handleAuthorChange}
            onDescriptionChange={handleDescriptionChange}
          />
        </main>
      </div>
      <SudokuRulesModal isOpen={isRulesModalOpen} onClose={() => setIsRulesModalOpen(false)} />
    </div>
  )
}

export default App
