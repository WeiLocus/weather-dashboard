import {
  TiWeatherCloudy,
  TiWeatherSunny,
  TiWeatherDownpour,
  TiWeatherWindyCloudy,
} from 'react-icons/ti'

function ForecastSection() {
  const forecasts = [
    {
      date: '5',
      day: 'Su',
      weather: 'windy',
      temp: 23,
      icon: <TiWeatherWindyCloudy className="h-8 w-8 text-blue-600" />,
    },
    {
      date: '6',
      day: 'Mo',
      weather: 'sunny',
      temp: 24,
      icon: <TiWeatherSunny className="h-8 w-8 text-yellow-400" />,
    },
    {
      date: '7',
      day: 'Tu',
      weather: 'sunny',
      temp: 22,
      icon: <TiWeatherSunny className="h-8 w-8 text-yellow-400" />,
    },
    {
      date: '8',
      day: 'We',
      weather: 'cloudy',
      temp: 25,
      icon: <TiWeatherCloudy className="h-8 w-8 text-gray-400" />,
    },
    {
      date: '9',
      day: 'Th',
      weather: 'rainy',
      temp: 21,
      icon: <TiWeatherDownpour className="h-8 w-8 text-blue-400" />,
    },
  ]

  return (
    <div className="mt-4 md:mt-12">
      <div className="text-lg font-bold md: text-center md:text-xl">
        5-Day Forecast
      </div>

      {/* 顯示今天日期與星期幾 */}
      <div className="relative flex flex-col justify-center mt-4 gap-3 md:flex-row md:flex-wrap md:gap-6">
        {forecasts.map((forecast, index) => (
          <div
            key={index}
            className=" bg-white p-3 rounded-xl shadow-lg w-full  flex justify-between items-center md:w-1/6 md:flex-col"
          >
            <div className="flex text-lg font-semibold">
              <p className="text-gray-600">{forecast.day}</p>
              <span className="mx-2 text-gray-500">|</span>
              <p className="text-gray-800">{forecast.date}</p>
            </div>
            <p className="font-semibold text-gray-800">{forecast.temp}°</p>

            <div className="py-2">{forecast.icon}</div>
            <p className="text-sm text-gray-500">{forecast.weather}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastSection
