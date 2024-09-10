const colorOptions = [
  // Colorful colors
  { name: 'red', light: 'bg-red-500', dark: 'dark:bg-red-700' },
  { name: 'orange', light: 'bg-orange-500', dark: 'dark:bg-orange-700' },
  { name: 'yellow', light: 'bg-yellow-500', dark: 'dark:bg-yellow-600' },
  { name: 'green', light: 'bg-green-500', dark: 'dark:bg-green-700' },
  { name: 'teal', light: 'bg-teal-500', dark: 'dark:bg-teal-700' },
  { name: 'blue', light: 'bg-blue-500', dark: 'dark:bg-blue-700' },
  { name: 'indigo', light: 'bg-indigo-500', dark: 'dark:bg-indigo-700' },
  { name: 'purple', light: 'bg-purple-500', dark: 'dark:bg-purple-700' },
  { name: 'pink', light: 'bg-pink-500', dark: 'dark:bg-pink-700' },
  // Neutral tones
  { name: 'white', light: 'bg-white', dark: 'dark:bg-gray-800' },
  { name: 'gray', light: 'bg-gray-400', dark: 'dark:bg-gray-600' },
  { name: 'black', light: 'bg-gray-800', dark: 'dark:bg-white' },
]

const ColorPicker = ({ selectedColor, onColorSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg dark:bg-gray-900">
      {colorOptions.map((color) => (
        <button
          key={color.name}
          className={`w-8 h-8 rounded-full ${color.light} ${color.dark} ${
            selectedColor === color.name ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onColorSelect(color.name)}
          aria-label={`Select ${color.name} color`}
        />
      ))}
    </div>
  )
}

export default ColorPicker
