import axios from 'axios'
import { formatDate } from '../utils/formateDate'
import { weatherCodeMap } from '../constants/weatherCodeMap'

export const weatherService = {
  // 獲取城市的經緯度
  getGeoLocation: async (cityName) => {
    try {
      const response = await axios.get(
        // name: 城市名稱, count: 回傳的匹配數量
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      )

      console.log('response:', response)
      console.log('results:', response.data.results)

      if (response.status === 200 && !response.data.results?.length) {
        throw new Error('City not found')
      }

      return response.data.results[0]
    } catch (error) {
      console.error('fetch Geolocation error:', error.message)
    }
  },

  // 獲取天氣資料
  getWeatherData: async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
      )

      return response.data
    } catch (error) {
      console.error('Weather API error:', error.message)
      throw error
    }
  },

  // 取得當前天氣資料
  extractCurrentWeather: (hourlyData, hourlyUnits, city) => {
    const currentDate = formatDate.getCurrentDate()
    const currentTime = formatDate.getCurrentTime()
    const index = formatDate.findCurrentHourIndex(hourlyData.time, currentDate)

    const weatherCode = hourlyData.weather_code[index]
    const weatherDescription = weatherCodeMap[weatherCode]?.description || null

    return {
      city,
      temperature: hourlyData.temperature_2m[index],
      humidity:
        hourlyData.relative_humidity_2m[index] +
        hourlyUnits.relative_humidity_2m,
      weatherCode,
      weatherDescription,
      weatherIcon: weatherCodeMap[hourlyData.weather_code[index]].icon,
      windSpeed: hourlyData.wind_speed_10m[index] + hourlyUnits.wind_speed_10m,
      time: currentTime,
    }
  },

  // 取得天氣預報資料
  extractForecast: (hourlyData, hourlyUnits) => {
    const forecast = []
    const uniqueDays = new Set() // 不重複存取
    const currentDate = formatDate.getCurrentDate()

    for (let i = 0; i < hourlyData.time.length; i++) {
      const timeStr = hourlyData.time[i]
      const [date, time] = timeStr.split('T')
      const hour = time.split(':')[0]

      // 跳過今天和已經處理過的日期
      if (date === currentDate || uniqueDays.has(date)) {
        continue
      }

      // 只取中午 12 點的資料
      if (hour === '12') {
        uniqueDays.add(date)

        const weatherCode = hourlyData.weather_code[i]
        forecast.push({
          id: date, // 不重複
          date: formatDate.getMonthAndDay(date),
          weekday: formatDate.getWeekday(date),
          temperature: hourlyData.temperature_2m[i],
          humidity:
            hourlyData.relative_humidity_2m[i] +
            hourlyUnits.relative_humidity_2m,
          weatherCode,
          weatherIcon: weatherCodeMap[hourlyData.weather_code[i]].icon,
          weatherDescription: weatherCodeMap[weatherCode]?.description || null,
          windSpeed: hourlyData.wind_speed_10m[i] + hourlyUnits.wind_speed_10m,
        })

        // 只取 5 天的預報
        if (forecast.length >= 5) break
      }
    }

    return forecast
  },
}
