import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import ForecastSection from '../components/ForecastSection'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
// Tailwind 預設斷點
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

function WeatherDashboard() {
  const [city, setCity] = useState('')
  // const [weatherDate, setWeatherData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('useEffect')
    if (!city) return
    fetchWeatherDate(city)
  }, [city])

  const handleSearch = async (searchCity) => {
    console.log('current search:', searchCity)
    setErrorMessage('')
    setCity(searchCity)
  }

  // 透過城市名稱請求經緯度
  const fetchWeatherDate = async (cityName) => {
    console.log('fetch data', cityName)

    try {
      const response = await axios.get(
        // name: 城市名稱, count: 回傳的匹配數量
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      )

      console.log('response:', response)
      console.log('results:', response.data.results)

      if (response.status === 200 && !response.data.results) {
        setErrorMessage('City not found, Please try again.')
        return
      }

      if (response.status === 200 && response.data.results?.length > 0) {
        const { latitude, longitude } = response.data.results[0]
        console.log('latitude, longitude:', latitude, longitude)
      }
    } catch (error) {
      console.error('fetch error:', error.message)
      setErrorMessage('Failed to fetch data.')
    }
  }

  return (
    <div>
      <header className="text-2xl m-auto py-3 bg-blue-400 text-slate-50 font-bold">
        Weather Dashboard
      </header>
      <SearchBar onSearch={handleSearch} />
      <main className="md: m-4 p-3 max-w-5xl mx-auto bg-gray-200">
        <WeatherCard />
        <ForecastSection />
      </main>
    </div>
  )
}

export default WeatherDashboard
