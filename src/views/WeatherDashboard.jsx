import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import ForecastSection from '../components/ForecastSection'
import Modal from '../components/Modal'
import { weatherCodeMap } from '../constants/weatherCodeMap'
import { formatDate } from '../utils/formateDate'

function WeatherDashboard() {
  const [city, setCity] = useState('Taipei')
  const [weatherData, setWeatherData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [updateTrigger, setUpdateTrigger] = useState(0) // 確保city能響應式變化
  const [forecastData, setForecastData] = useState(null)

  // 第一次進來先以台北當作預設
  useEffect(() => {
    fetchWeatherDate(city)
  }, [city, updateTrigger])

  // 取得當天日期
  const currentDate = formatDate.getCurrentDate()

  const handleSearch = async (searchCity) => {
    setErrorMessage('')
    setCity(searchCity)
    if (searchCity === city) {
      setUpdateTrigger((prev) => prev + 1)
    }
  }

  // 透過城市名稱請求經緯度
  const fetchWeatherDate = async (cityName) => {
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
    setWeatherData(currentWeatherData)
    // 提取天氣預報資料
    const forecastData = extractForecast(data.hourly, data.hourly_units)
    console.log('forecastData:', forecastData)
    setForecastData(forecastData)
  }

  // 整理日期與時間用來比對hourlyData, 拿到目前天氣資訊
  const extractCurrentWeather = (hourlyData, hourlyUnits) => {
    const now = new Date()
    const currentHour = now.getHours()

    // 用來顯示當前時間 hh:mm
    const currentTime = formatDate.getCurrentTime()

    let index = 0

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

    // 轉換天氣代碼成天氣描述
    let weatherDescription = ''
    if (index !== undefined) {
      Object.keys(weatherCodeMap).forEach((key) => {
        if (String(hourlyData.weather_code[index]) === key) {
          weatherDescription = weatherCodeMap[key].description
        }
      })
    }

    const weatherDate = {
      city: city,
      temperature: hourlyData.temperature_2m[index],
      humidity:
        hourlyData.relative_humidity_2m[index] +
        hourlyUnits.relative_humidity_2m,
      weatherCode: hourlyData.weather_code[index],
      weatherDescription: weatherDescription,
      weatherIcon: weatherCodeMap[hourlyData.weather_code[index]].icon,
      windSpeed: hourlyData.wind_speed_10m[index] + hourlyUnits.wind_speed_10m,
      time: currentTime,
    }

    return weatherDate
  }

  // 整理日期與時間用來比對hourlyData, 取出預報資料
  const extractForecast = (hourlyData, hourlyUnits) => {
    const forecast = []
    // 紀錄已經加入資料的日期, 確保不重複
    const uniqueDays = new Set()

    let dayCounter = 0
    // 儲存已經放過日期的值
    const seenHours = {}
    // 因為有時區問題, 會需要+8, 改直接用字串來比對日期與時間
    for (let i = 0; i < hourlyData.time.length; i++) {
      const timeStr = hourlyData.time[i]
      // 切分日期、時間
      const [date, time] = timeStr.split('T')
      const hour = time.split(':')[0]

      // 跳過今天
      if (date === currentDate || uniqueDays.has(date)) continue

      if (hour === '12' && !seenHours[date]) {
        seenHours[date] = true
        uniqueDays.add(date)
        dayCounter++
        // 組合 mm/dd
        const monthAndDay = formatDate.getMonthAndDay(date)

        forecast.push({
          date: monthAndDay,
          weekday: formatDate.getWeekday(date),
          temperature: hourlyData.temperature_2m[i],
          humidity:
            hourlyData.relative_humidity_2m[i] +
            hourlyUnits.relative_humidity_2m,
          weatherCode: hourlyData.weather_code[i],
          weatherIcon: weatherCodeMap[hourlyData.weather_code[i]].icon,
          weatherDescription:
            weatherCodeMap[hourlyData.weather_code[i]].description,
          windSpeed: hourlyData.wind_speed_10m[i] + hourlyUnits.wind_speed_10m,
        })
      }
      // 只儲存五天的數據
      if (dayCounter >= 5) break
    }
    return forecast
  }

  return (
    <div>
      <header className="text-2xl m-auto py-3 bg-blue-400 text-slate-50 font-bold">
        Weather Dashboard
      </header>
      <SearchBar onSearch={handleSearch} />
      <main className="md: m-4 p-3 max-w-5xl mx-auto">
        <WeatherCard weatherData={weatherData} />
        <ForecastSection forecastData={forecastData} />
      </main>
      {errorMessage && (
        <Modal message={errorMessage} onClose={() => setErrorMessage('')} />
      )}
    </div>
  )
}

export default WeatherDashboard
