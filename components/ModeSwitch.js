export default function ModeSwitch({ mode, onModeChange }) {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 w-full max-w-xs">
      <button
        onClick={() => onModeChange('learn')}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
          mode === 'learn'
            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
      >
        📚 Learn
      </button>
      <button
        onClick={() => onModeChange('quiz')}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
          mode === 'quiz'
            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
      >
        🎯 Quiz
      </button>
    </div>
  );
} 