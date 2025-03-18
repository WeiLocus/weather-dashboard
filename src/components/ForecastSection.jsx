// import ForecastCard from "./ForecastCard"
function ForecastSection({ forecastData, isCelsius }) {
  console.log('props forecastData:', forecastData)

  if (!forecastData) {
    return null
  }

  // 把溫度轉換成華視
  const tranTemperature = (temp) => {
    const fahrenheit = (temp * 9) / 5 + 32
    return fahrenheit.toFixed(1)
  }

  return (
    <div className="mt-4 md:mt-12">
      <div className="text-lg font-bold md: text-center md:text-xl">
        5-Day Forecast
      </div>

      <div className="relative flex flex-col justify-center mt-4 gap-3 md:flex-row md:flex-wrap md:gap-6">
        {forecastData &&
          forecastData.map((forecast) => (
            <div
              key={forecast.id}
              className="flex justify-between items-center gap-2 w-full min-h-16 bg-white p-3 rounded-xl shadow-lg md:w-1/6 md:flex-col md:min-h-40"
            >
              <div className="flex basis-1/4 font-semibold">
                <p className="w-10 text-gray-600">{forecast.weekday}</p>
                <span className="mx-1 text-gray-800">|</span>
                <p className="w-10 text-gray-600">{forecast.date}</p>
              </div>
              <p className="basis-1/6 font-semibold text-gray-800">
                {isCelsius
                  ? `${forecast.temperature}°C`
                  : `${tranTemperature(forecast.temperature)}°F`}
              </p>
              {forecast.weatherIcon && (
                <div className="basis-1/6 flex justify-center items-center">
                  <forecast.weatherIcon className="h-6 w-6" />
                </div>
              )}
              <p className="basis-2/5 text-sm text-gray-500">
                {forecast.weatherDescription}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ForecastSection
