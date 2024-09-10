/* src/components/SudokuMetadata.jsx */
const SudokuMetadata = ({
  title,
  author,
  description,
  onTitleChange,
  onAuthorChange,
  onDescriptionChange,
}) => {
  return (
    <div className="p-4 mb-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          placeholder="Enter puzzle title"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="author"
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
          className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          placeholder="Enter author name"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows="3"
          className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          placeholder="Enter puzzle description"
        ></textarea>
      </div>
    </div>
  )
}

export default SudokuMetadata
