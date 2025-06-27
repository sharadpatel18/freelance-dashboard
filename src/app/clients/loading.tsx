export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Animated logo or icon */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Loading
            <span className="inline-flex space-x-1 ml-1">
              {[...Array(3)].map((_, i) => (
                <span 
                  key={i}
                  className="inline-block w-1 h-1 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Preparing your experience...
          </p>
        </div>

        {/* Progress bar (optional) */}
        <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-blue-600 h-1.5 rounded-full animate-progress" 
            style={{ width: '80%' }}
          />
        </div>
      </div>
    </div>
  );
}