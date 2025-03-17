import { useState } from 'react'
import { FaHeart, FaRegClock } from 'react-icons/fa'

function WeatherCard({ weatherData }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isCelsius, setIsCelsius] = useState(true)

  if (Object.keys(weatherData).length === 0) {
    return null
  }

  const temperatureC = weatherData.temperature
  const temperatureF = (temperatureC * 9) / 5 + 32

  return (
    <div className="relative max-w-96 min-w-60 py-3 px-4 border-1 rounded-xl border-slate-400-500 shadow-lg m-auto bg-white">
      <div className="flex justify-between">
        {/* handle toggle favorite */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-[18px] right-4 text-gray-400 hover:text-red-500 transition"
          title="add to favorite"
        >
          <FaHeart
            className={`w-4 h-4 ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
        <p className="mb-1 text-xl font-bold">{weatherData.city}</p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="order-1 md:order-none text-start">
          <p className="flex items-center gap-2 my-2 ">
            <FaRegClock />
            {weatherData.time}
          </p>
          <p className="flex justify-around items-center text-sm text-gray-500 md:gap-3">
            {weatherData.weatherIcon && (
              <weatherData.weatherIcon className="h-6 w-6" />
            )}
            {weatherData.weatherDescription}
          </p>
        </div>

        {/* 溫度 + 切換按鈕 */}
        <div className="flex md:flex-col md:gap-2 items-center gap-5 my-2 order-2 md:order-none text-start">
          <p className="text-lg font-medium md:text-2xl">
            {isCelsius ? `${temperatureC}°C` : `${temperatureF.toFixed(1)}°F`}
          </p>

          {/* Toggle 開關 */}
          <button
            onClick={() => setIsCelsius(!isCelsius)}
            className="relative w-[60px] h-5 bg-gray-300 rounded-full flex items-center px-1 transition"
          >
            <span className="text-xs text-gray-700 w-6 text-center">
              {isCelsius ? '°F' : '°C'}
            </span>
            {/* toggle移動 */}
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                isCelsius ? 'translate-x-3' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-sm font-medium">{weatherData.windSpeed}</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-sm font-medium">{weatherData.humidity}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
