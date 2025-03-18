import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import ForecastSection from '../components/ForecastSection'
import Modal from '../components/Modal'
import LoadingSpinner from '../components/LoadingSpinner'
import TemperatureToggle from '../components/TemperatureToggle'
import FavoriteCity from '../components/FavoriteCity'
import { weatherService } from '../services/weatherService'

function WeatherDashboard() {
  const [city, setCity] = useState('Taipei')
  const [weatherData, setWeatherData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [updateTrigger, setUpdateTrigger] = useState(0) // 確保city能響應式變化
  const [forecastData, setForecastData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCelsius, setIsCelsius] = useState(true)
  const [favCities, setFavCities] = useState([])

  // 第一次進來先以台北當作預設
  useEffect(() => {
    fetchWeatherDate(city)
  }, [city, updateTrigger])

  // 判斷localStorage有沒有喜愛城市的資料
  useEffect(() => {
    const currentFavoriteCities =
      JSON.parse(localStorage.getItem('favoriteCity')) || []
    setFavCities(currentFavoriteCities)
  }, [])

  // 觸發搜尋天氣
  const handleSearch = async (searchCity) => {
    setErrorMessage('')
    setCity(searchCity)
    if (searchCity === city) {
      setUpdateTrigger((prev) => prev + 1)
    }
  }

  // 透過城市名稱請求經緯度、天氣資料
  const fetchWeatherDate = async (cityName) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      // 獲取城市的經緯度
      const geoData = await weatherService.getGeoLocation(cityName)
      console.log('geoData:', geoData)

      // 獲取天氣資料
      const weatherData = await weatherService.getWeatherData(
        geoData.latitude,
        geoData.longitude
      )

      // 處理天氣資料
      const currentWeatherData = weatherService.extractCurrentWeather(
        weatherData.hourly,
        weatherData.hourly_units,
        cityName
      )

      console.log('currentWeatherData:', currentWeatherData)
      setWeatherData(currentWeatherData)

      // 處理預報資料
      const forecastData = weatherService.extractForecast(
        weatherData.hourly,
        weatherData.hourly_units
      )

      console.log('forecastData:', forecastData)

      setForecastData(forecastData)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setErrorMessage(
        error.message === 'City not found'
          ? 'City not found. Please try again.'
          : 'Failed to fetch weather data.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // 控制溫度切換
  const handleSwitchTemp = () => {
    setIsCelsius(!isCelsius)
  }

  // 處理喜愛城市的新增/移除
  const handleToggleFavorite = (cityName) => {
    // 避免污染
    let updatedFavorite = [...favCities]

    if (updatedFavorite.includes(cityName)) {
      updatedFavorite = updatedFavorite.filter((city) => city !== cityName)
    } else {
      updatedFavorite.push(cityName)
    }

    // 更新localStorage資料
    localStorage.setItem('favoriteCity', JSON.stringify(updatedFavorite))
    setFavCities(updatedFavorite)
  }

  return (
    <div>
      <header className="text-2xl m-auto py-3 bg-blue-400 text-slate-50 font-bold">
        Weather Dashboard
      </header>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <main className="md: m-4 p-3 max-w-5xl mx-auto">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="absolute top-12 right-8 m-4">
              <TemperatureToggle
                isCelsius={isCelsius}
                handleSwitchTemp={handleSwitchTemp}
              />
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row md:justify-around md:items-start">
              <WeatherCard
                weatherData={weatherData}
                isCelsius={isCelsius}
                handleSwitchTemp={handleSwitchTemp}
                favoriteCities={favCities}
                onToggleFavorite={handleToggleFavorite}
              />
              <FavoriteCity
                favoriteCities={favCities}
                onToggleFavorite={handleToggleFavorite}
                isCelsius={isCelsius}
              />
            </div>
            <ForecastSection
              forecastData={forecastData}
              isCelsius={isCelsius}
            />
          </>
        )}
      </main>
      {errorMessage && (
        <Modal message={errorMessage} onClose={() => setErrorMessage('')} />
      )}
    </div>
  )
}

export default WeatherDashboard
