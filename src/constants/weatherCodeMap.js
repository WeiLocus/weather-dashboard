// 引入 React Icons
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
} from 'react-icons/ti'

// 天氣代碼映射表
export const weatherCodeMap = {
  0: { description: 'Clear sky', icon: TiWeatherSunny },
  1: {
    description: 'Mainly clear, partly cloudy, and overcast',
    icon: TiWeatherPartlySunny,
  },
  2: {
    description: 'Mainly clear, partly cloudy, and overcast',
    icon: TiWeatherPartlySunny,
  },
  3: {
    description: 'Mainly clear, partly cloudy, and overcast',
    icon: TiWeatherPartlySunny,
  },
  45: { description: 'Fog and depositing rime fog', icon: TiWeatherCloudy },
  48: { description: 'Fog and depositing rime fog', icon: TiWeatherCloudy },
  51: {
    description: 'Drizzle: Light, moderate, and dense intensity',
    icon: TiWeatherShower,
  },
  53: {
    description: 'Drizzle: Light, moderate, and dense intensity',
    icon: TiWeatherShower,
  },
  55: {
    description: 'Drizzle: Light, moderate, and dense intensity',
    icon: TiWeatherShower,
  },
  56: {
    description: 'Freezing Drizzle: Light and dense intensity',
    icon: TiWeatherShower,
  },
  57: {
    description: 'Freezing Drizzle: Light and dense intensity',
    icon: TiWeatherShower,
  },
  61: {
    description: 'Rain: Slight, moderate and heavy intensity',
    icon: TiWeatherDownpour,
  },
  63: {
    description: 'Rain: Slight, moderate and heavy intensity',
    icon: TiWeatherDownpour,
  },
  65: {
    description: 'Rain: Slight, moderate and heavy intensity',
    icon: TiWeatherDownpour,
  },
  66: {
    description: 'Freezing Rain: Light and heavy intensity',
    icon: TiWeatherShower,
  },
  67: {
    description: 'Freezing Rain: Light and heavy intensity',
    icon: TiWeatherShower,
  },
  71: {
    description: 'Snow fall: Slight, moderate, and heavy intensity',
    icon: TiWeatherSnow,
  },
  73: {
    description: 'Snow fall: Slight, moderate, and heavy intensity',
    icon: TiWeatherSnow,
  },
  75: {
    description: 'Snow fall: Slight, moderate, and heavy intensity',
    icon: TiWeatherSnow,
  },
  77: { description: 'Snow grains', icon: TiWeatherSnow },
  80: {
    description: 'Rain showers: Slight, moderate, and violent',
    icon: TiWeatherShower,
  },
  81: {
    description: 'Rain showers: Slight, moderate, and violent',
    icon: TiWeatherShower,
  },
  82: {
    description: 'Rain showers: Slight, moderate, and violent',
    icon: TiWeatherShower,
  },
  85: { description: 'Snow showers slight and heavy', icon: TiWeatherSnow },
  86: { description: 'Snow showers slight and heavy', icon: TiWeatherSnow },
  95: {
    description: 'Thunderstorm: Slight or moderate',
    icon: TiWeatherStormy,
  },
  96: {
    description: 'Thunderstorm with slight and heavy hail',
    icon: TiWeatherStormy,
  },
  99: {
    description: 'Thunderstorm with slight and heavy hail',
    icon: TiWeatherStormy,
  },
}
