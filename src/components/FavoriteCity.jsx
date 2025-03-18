import { useState, useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { weatherService } from '../services/weatherService'

function FavoriteCity({ favoriteCities, onToggleFavorite, isCelsius }) {
  // 紀錄喜愛城市的天氣資料
  const [citiesWeather, setCitiesWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCitiesWeather()
  }, [favoriteCities])

  // 當收藏城市列表改變時獲取天氣資料
  const fetchCitiesWeather = async () => {
    if (favoriteCities.length === 0) {
      setCitiesWeather({})
      return
    }

    setIsLoading(true)

    // 建立一個新的天氣資料物件
    const newWeatherData = { ...citiesWeather }

    // 對每個城市獲取天氣資料
    const weatherFetchTasks = favoriteCities.map(async (city) => {
      try {
        // 只獲取尚未載入或需要更新的城市資料
        const geoData = await weatherService.getGeoLocation(city)
        const data = await weatherService.getWeatherData(
          geoData.latitude,
          geoData.longitude
        )

        // 處理天氣資料
        const processedData = weatherService.extractCurrentWeather(
          data.hourly,
          data.hourly_units,
          city
        )
        console.log('processedData:', processedData)
        return { city, data: processedData, error: false }
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error)
        return { city, error: true, errorMessage: error.message }
      }
    })

    console.log('weatherFetchTasks:', weatherFetchTasks)

    // 等待所有請求完成, 即使某些請求失敗也會等待所有請求完成, 避免一個城市的資料有問題列表就都壞掉
    const results = await Promise.allSettled(weatherFetchTasks)

    // 更新天氣資料狀態
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { city, data, error, errorMessage } = result.value
        newWeatherData[city] = { data, error, errorMessage }
      }
    })
    console.log('newWeatherData:', newWeatherData)
    setCitiesWeather(newWeatherData)
    setIsLoading(false)
  }

  // 轉換溫度單位
  const formatTemperature = (temp) => {
    const fahrenheit = (temp * 9) / 5 + 32
    return `${fahrenheit.toFixed(1)}`
  }

  return (
    <div className="max-w-96 min-w-80 p-4 rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold mb-2">Favorite Cities</h2>
      {favoriteCities.length === 0 ? (
        <p className="text-gray-500">No favorite cities yet.</p>
      ) : isLoading && Object.keys(citiesWeather).length === 0 ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ul>
          {favoriteCities.map((city) => {
            const cityWeatherData = citiesWeather[city]

            return (
              <li
                key={city}
                className="flex items-center justify-around py-3 border-b last:border-none hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="w-20 text-start font-medium">{city}</span>
                  {cityWeatherData && !cityWeatherData.error ? (
                    <>
                      <span className="w-14">
                        {isCelsius
                          ? `${cityWeatherData.data.temperature}°C`
                          : `${formatTemperature(
                              cityWeatherData.data.temperature
                            )}°F`}
                      </span>
                      {cityWeatherData.data.weatherIcon && (
                        <cityWeatherData.data.weatherIcon className="h-6 w-6" />
                      )}
                    </>
                  ) : cityWeatherData && cityWeatherData.error ? (
                    <span className="text-sm text-red-500">
                      Failed to load weather
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Loading...</span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(city)
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default FavoriteCity
