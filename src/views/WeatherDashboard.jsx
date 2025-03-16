import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import ForecastSection from '../components/ForecastSection'
import Modal from '../components/Modal'
import { weatherCodeMap } from '../constants/weatherCodeMap'
// Tailwind 預設斷點
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

function WeatherDashboard() {
  const [city, setCity] = useState('Taipei')
  const [weatherData, setWeatherData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [updateTrigger, setUpdateTrigger] = useState(0) // 確保city能響應式變化

  // 第一次進來先以台北當作預設
  useEffect(() => {
    fetchWeatherDate(city)
  }, [city, updateTrigger])

  const handleSearch = async (searchCity) => {
    console.log('current search:', searchCity)
    setErrorMessage('')
    setCity(searchCity)
    // fetchWeatherDate(searchCity)
    if (searchCity === city) {
      setUpdateTrigger((prev) => prev + 1)
    }
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

      if (response.status === 200 && !response.data.results.length) {
        setErrorMessage('City not found, Please try again.')
        return
      }

      if (response.status === 200 && response.data.results?.length > 0) {
        const { latitude, longitude } = response.data.results[0]
        console.log('latitude, longitude:', latitude, longitude)

        //使用經緯度請求current weather information
        const weatherResponse = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        )

        console.log('天氣 API 回應:', weatherResponse.data)

        // 處理天氣資料
        processWeatherData(weatherResponse.data)
      }
    } catch (error) {
      console.error('fetch error:', error.message)
      setErrorMessage('Failed to fetch data.')
    }
  }
  // 處理API拿到的數據
  const processWeatherData = (data) => {
    if (!data || !data.hourly) return

    // 提取目前的天氣資料
    const currentWeatherData = extractCurrentWeather(
      data.hourly,
      data.hourly_units
    )
    console.log('currentWeatherData:', currentWeatherData)
  }
  // 整理日期與時間用來比對hourlyData
  const extractCurrentWeather = (hourlyData, hourlyUnits) => {
    console.log('city:', city)
    console.log('hourlyData:', hourlyData)
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTime = `${currentHour}:${
      currentMinute < 10 ? `0${currentMinute}` : currentMinute
    }`

    let index = 0
    // 取得日期
    const currentDate = now.toISOString().split('T')[0]

    for (let i = 0; i < hourlyData.time.length; i++) {
      const time = new Date(hourlyData.time[i])
      if (
        time.toISOString().split('T')[0] === currentDate &&
        time.getHours() === currentHour
      ) {
        index = i
        break
      }
    }
    console.log('index:', index)

    // 轉換天氣代碼成天氣描述
    let weatherDescription = ''
    if (index !== undefined) {
      Object.keys(weatherCodeMap).forEach((key) => {
        if (String(hourlyData.weather_code[index]) === key) {
          console.log('key:', key)
          weatherDescription = weatherCodeMap[key].description
          console.log('weatherDescription:', weatherDescription)
        }
      })
    }
    console.log('9999city:', city)
    const weatherDate = {
      city: city,
      temperature: hourlyData.temperature_2m[index],
      humidity:
        hourlyData.relative_humidity_2m[index] +
        hourlyUnits.relative_humidity_2m,
      weatherCode: hourlyData.weather_code[index],
      weatherDescription: weatherDescription,
      windSpeed: hourlyData.wind_speed_10m[index] + hourlyUnits.wind_speed_10m,
      time: currentTime,
    }

    setWeatherData(weatherDate)
    console.log('weatherDate:', weatherDate)

    return weatherDate
  }

  return (
    <div>
      <header className="text-2xl m-auto py-3 bg-blue-400 text-slate-50 font-bold">
        Weather Dashboard
      </header>
      <SearchBar onSearch={handleSearch} />
      <main className="md: m-4 p-3 max-w-5xl mx-auto bg-gray-200">
        <WeatherCard weatherData={weatherData} />
        <ForecastSection />
      </main>
      {errorMessage && (
        <Modal message={errorMessage} onClose={() => setErrorMessage('')} />
      )}
    </div>
  )
}

export default WeatherDashboard
