import { useStore } from '../lib/store'

export default function UI() {
  const { categories, selections, setSelection } = useStore()

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
      <div className="flex gap-4 overflow-x-auto">
        {Object.entries(categories).map(([category, options]) => (
          <div key={category} className="flex flex-col gap-2">
            <span className="text-white text-sm capitalize">{category}</span>
            <div className="flex gap-1">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelection(category, option)}
                  className={`w-12 h-12 rounded border-2 ${
                    selections[category] === option
                      ? 'border-white'
                      : 'border-gray-600'
                  } bg-gray-800 text-white text-xs`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
