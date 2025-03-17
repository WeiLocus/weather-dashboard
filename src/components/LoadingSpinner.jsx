function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-40 py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading weather data...</p>
    </div>
  )
}

export default LoadingSpinner
